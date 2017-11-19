import { isObservable, object, wrap } from 'node_modules/observable/src/index';
import { Binder, BindingHandler, Htmls } from 'node_modules/binder/src/index';
import { provider as serviceProvider } from './service';
import { AbstractBinder } from './binder';
import * as $ from 'node_modules/jquery/dist/jquery';

function foreach<T>(item, callback) {
    let i;
    if (item instanceof Array) {
        for (i=0; i<item.length;i++) {
            callback(item[i], i);
        }
    } else {
        for (i in item) {
            callback(item[i], i);
        }
    }
}

function map<T, T2>(array: T[], parse: (item: T)=>T2): T2[] {
    let res = [];
    foreach(array, (x) => { res.push(parse(x)); return false; });
    return  res;
}

function grep<T>(array: T[], predicate: (item: T, index: number)=>boolean): T[] {
    let i, res = [];
    for (i=0; i<array.length;i++) {
        if (predicate(array[i], i)) res.push(array[i]);
    }

    return res;
}

export declare type ViewOption<TModel> = {
    selector?: string,
    template?: string,
    html?: string,
    binding?: { [s:string]: AbstractBinder<any, TModel>[] }
};

declare type RegisteredView<TModel> = {
    construct: {new(...args:any[]): any},
    binding: { [s:string]: AbstractBinder<any, TModel>[] }
    parameters: any[],
    html: Promise<string> 
};

let registeredView: RegisteredView<any>[] = [];

export function View<T>(options: ViewOption<T>) { 
    return (constructor: {new(...args:any[]):T}, metadata?) => {
        registeredView.push({
            construct: constructor,
            binding: options.binding,
            parameters: metadata && metadata["design:paramtypes"] || [],
            html: new Promise((resolve, reject) => {
                options.html && resolve(options.html);
                options.template && !options.html && (() => {
                    $("<div>").load(`/${options.template}`, (template, status) => { 
                        status == "error" && (reject() || true) ||
                        resolve(template) 
                    });
                })();
            })
        });
    };
}

export class SubviewHandler<TModel> extends BindingHandler<{ type: any, callback?: (view: any) => void }[], TModel> {
	private _binder: Binder<{ type: any, callback?: (view: any) => void }[], TModel>;
	private _observable;
	
    constructor() {
        super();
		this._binder = new Binder(Htmls, (ctx) => this._observable());
		this._observable = object();
    }
	
	init(element, valueAccessor, viewmodel, context) {
		this._binder.bind(element, viewmodel, context);
	}

    update(element, valueAccessor, viewmodel, context) {
        var $element = $(element);
        var array: { type: any, callback?: (view: any) => void }[] = valueAccessor();

		wrap(() => {
			var htmls = map(array, (item) => {
				var viewType = item && item.type && grep(registeredView, (view) => view.construct.prototype instanceof item.type || item.type === view.construct)[0];
				var view = viewType && (serviceProvider && serviceProvider.createService(viewType.construct, viewType.parameters) || new viewType.construct());
				view && view.initialize && view.initialize(viewmodel);
				view && item.callback && item.callback(view);
				return viewType && viewType.html.then(value => {
					return { template: value, model: view, config: viewType.binding };
				});
			});

			Promise.all(htmls).then((results) => {
				this._observable(results);
			});
		}).silent();
    }
}

export function start<T>(el: HTMLElement, type: { prototype: T }, callback?: (view: T) => void) {
    var element:any = el;
    !element.viewmodel && (new Binder(SubviewHandler, (ctx) => [element.viewmodel.view()]).bind(element, element.viewmodel = {
        view: object<any>({
            type: type, callback: callback
        })
    }) || true) || element.viewmodel.view({ type: type, callback: callback });
}
