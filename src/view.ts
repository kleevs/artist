import { foreach, map, grep } from 'node_modules/mixin/src/index';
import { isObservable, object, wrap } from 'node_modules/observable/src/index';
import { applyBinding, BindingHandler, Htmls } from 'node_modules/mvvm/src/index';
import { provider as serviceProvider } from './service';
import * as $ from 'node_modules/jquery/dist/jquery';

export declare type ViewOption<TModel> = {
    selector?: string,
    template?: string,
    html?: string,
    binding?: { [s:string]: BindingHandler<any, TModel>[] }
};

declare type RegisteredView<TModel> = {
    construct: {new(...args:any[]): any},
    binding: { [s:string]: BindingHandler<any, TModel>[] }
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
                    $("<div>").load(options.template, (template, status) => { 
                        status == "error" && (reject() || true) ||
                        resolve(template) 
                    });
                })();
            })
        });
    };
}

export class Subview<TModel> extends BindingHandler<{ type: any, callback?: (view: any) => void }[], TModel> {
	private _htmlsHandler: Htmls<TModel>;
	private _observable;
	
    constructor(valueAccessor: (ctx) => { type: any, callback?: (view: any) => void }[]) {
        super(valueAccessor);
		this._htmlsHandler = new Htmls((ctx) => this._observable());
		this._observable = object();
    }
	
	init(element: HTMLElement, allBinding, viewmodel, context) {
		applyBinding([this._htmlsHandler], element, viewmodel, context);
	}

    update(element: HTMLElement, allBinding, viewmodel, context) {
        var $element = $(element);
        var array = this.valueAccessor();

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
    !element.viewmodel && (applyBinding([
        new Subview((ctx) => [element.viewmodel.view()])
    ], element, element.viewmodel = {
        view: object<any>({
            type: type, callback: callback
        })
    }) || true) || element.viewmodel.view({ type: type, callback: callback });
}
