import { observable } from 'node_modules/observable/src/index';
import { Binder } from 'node_modules/binder/src/index';
import { provider as serviceProvider, config, Service } from './service';
import { foreach, map, grep } from './mixin';
import * as $ from 'node_modules/jquery/dist/jquery';


export declare type ViewOption<TModel> = {
    selector?: string,
    template?: string,
    html?: string,
    binding?: { [s:string]: (model: TModel) => (element) => () => any }
};

declare type RegisteredView<TModel> = {
    construct: {new(...args:any[]): any},
    binding: { [s:string]: (model: TModel) => (element) => () => any }
    html: Promise<string> 
};

let registeredView: RegisteredView<any>[] = [];

export function View<T>(options: ViewOption<T>) { 
    return (constructor: Function, metadata?) => {
        options = constructor.prototype.__view__option__ = $.extend(true, constructor.prototype.__view__option__, options);
        registeredView.push({
            construct: <any>constructor,
            binding: options.binding,
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

export abstract class IViewProvider {
    abstract newInstance<T>(type: Function & { prototype: T }): T;
    abstract getNode(view: any): Promise<Element>;
}

@Service({
    interface: IViewProvider
})
class ViewProvider {
    public newInstance<T>(type: Function & { prototype: T }): T {
        var viewType = type && grep(registeredView, (view) => view.construct.prototype instanceof type || type === view.construct)[0];
        var view = viewType && (serviceProvider && config.getService(viewType.construct) && serviceProvider.createService(viewType.construct) || new viewType.construct());
        var binding = viewType.binding;

        view && view.initialize && view.initialize();
        viewType && (view.__elt__ = viewType.html.then(template => {
            var t = $(template);
            foreach(binding, (valueAccessor, selector) => {
                (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
                    new Binder(el).bind(valueAccessor(view));
                });
            });
            return t[0];
        }));

        return view;
    }

    public getNode(view: any): Promise<Element> {
        return view && view.__elt__;
    }
}

export function view(valueAccessor: () => any) {
	return (element) => {
		var $element = $(element);
        $element.html("");
        
		return () => {
            var value = valueAccessor();
            value && serviceProvider.getService(IViewProvider).getNode(value).then((el) => {
                $element.html("");
                $element.append(el);
            });
		};
	};
}