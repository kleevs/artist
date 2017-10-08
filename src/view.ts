import { foreach, map, grep } from 'node_modules/mixin/src/index';
import { isObservable, object } from 'node_modules/observable/src/index';
import { applyBinding, BindingHandler } from 'node_modules/mvvm/src/index';
import { IProvider } from 'node_modules/dependency-injection/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
export * from 'node_modules/mvvm/src/index';

export declare type ViewOption<TModel> = {
    selector?: string,
    template?: string,
    html?: string,
    binding?: { [s:string]: BindingHandler<any, TModel>[] }
};

declare type RegisteredView<TModel> = {
    construct: {new(...args:any[]): any},
    binding: { [s:string]: BindingHandler<any, TModel>[] }
    html: Promise<string> 
};

let registeredView: RegisteredView<any>[] = [];

export function View<T>(options: ViewOption<T>) { 
    return (constructor: {new(...args:any[]):T}) => {
        registeredView.push({
            construct: constructor,
            binding: options.binding,
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

function bindView<TModel>($element, bindings: {[s:string]: BindingHandler<any, TModel>[]}, viewmodel: TModel) {
    var config:{$el, binding: BindingHandler<any, TModel>[]}[] = [];
    foreach(bindings, (binding, selector) => {
        var $el = selector.trim() ===  "this" && $element || $element.find(selector);
        config.push({
            $el: $el,
            binding: binding
        });
    });

    foreach(config, (conf) => {
        conf.$el.each((i, el) => {
            if ($element[0] === el || $element.find(el).length > 0) {
                applyBinding(conf.binding, el, viewmodel);
            }
        });
    });
}

export class Subview<TModel> extends BindingHandler<{ type: any, constructor?: (view: any) => void }[], TModel> {
    constructor(valueAccessor: (ctx) => { type: any, constructor?: (view: any) => void }[]) {
        super(valueAccessor);
    }

    update(element: HTMLElement, allBinding, viewmodel, context) {
        var $element = $(element);
        var array = this.valueAccessor();

        var htmls = map(array, (item) => {
            var viewType = item && item.type && grep(registeredView, (view) => view.construct.prototype instanceof item.type || item.type === view.construct)[0];
            var view = viewType && (serviceProvider && serviceProvider.createService(viewType.construct) || new viewType.construct());
            view && item.constructor && item.constructor(view);
            return viewType && viewType.html.then(value => {
                var $el = $(value);
                bindView($el, viewType.binding, view);
                return $el;
            });
        });

        Promise.all(htmls).then((results) => {
            $element.html("");
            foreach(results, $el => $element.append($el));
        });
    }
}

export function start<T>(el: HTMLElement, type: { prototype: T }, callback?: (view: T) => void) {
    var element:any = el;
    !element.viewmodel && (applyBinding([
        new Subview((ctx) => [element.viewmodel.view()])
    ], element, element.viewmodel = {
        view: object<any>({
            type: type, constructor: callback
        })
    }) || true) || element.viewmodel.view({ type: type, constructor: callback });
}

let serviceProvider: IProvider;
export function setServiceProvider(value: IProvider) {
    serviceProvider = value;
}
