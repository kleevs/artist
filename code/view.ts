import { observable } from 'node_modules/observable/src/index';
import { Binder } from 'node_modules/binder/src/index';
import { serviceProvider, config, Service } from './service';
import { foreach, map, grep } from './mixin';
import * as $ from 'node_modules/jquery/dist/jquery';


export declare type ViewOption<TModel> = {
    selector?: string,
    template?: string,
    html?: string,
    binding?: { [s:string]: (model: TModel) => ((element) => () => any) | ((element) => () => any)[] }
};

declare type RegisteredView<TModel> = {
    construct: {new(...args:any[]): any},
    binding: { [s:string]: (model: TModel) => ((element) => () => any) | ((element) => () => any)[] }
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
	abstract newInstance<T>(type: Function & { prototype: T }, arg: any): T;
	abstract map<T>(type: Function & { prototype: T }): (arg: any) => T;
    abstract getNode(view: any): Promise<Element>;
    abstract getView(element: Element): any;
}

@Service({
    interface: IViewProvider
})
class ViewProvider {
	public newInstance<T>(type: Function & { prototype: T }): T;
	public newInstance<T>(type: Function & { prototype: T }, arg: any): T;
    public newInstance<T>(type: Function & { prototype: T }, arg?: any): T {
        var viewType = type && grep(registeredView, (view) => view.construct.prototype instanceof type || type === view.construct)[0];
        var view = viewType && (serviceProvider && config.getService(viewType.construct) && serviceProvider.createService(viewType.construct) || new viewType.construct());
        var binding = viewType.binding;

        view && view.initialize && view.initialize(arg);
        viewType && (view.__elt__ = viewType.html.then(template => {
            var t = $(template);
            foreach(binding, (valueAccessor, selector) => {
                (selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
                    var binder = valueAccessor(view);
                    var binders = binder && !(binder instanceof Array) && [binder] || binder;
                    binders.forEach(b => new Binder(el).bind(b));
                });
            });

            t[0].__view__ = view;
            return t[0];
        }));

        return view;
    }
	
	public map<T>(type: Function & { prototype: T }): (arg: any) => T {
		return (arg: any) => this.newInstance(type, arg);
	}

    public getNode(view: any): Promise<Element> {
        return view && view.__elt__;
    }

    public getView(element: Element): any {
        return element && (<any>element).__view__;
    }
}

export function view(valueAccessor: () => any) {
	return (element) => {
		var $element = $(element);
        $element.html("");
        
		return () => {
            var value = valueAccessor();
			var array = !value || value instanceof Array ? (value || []) : [value];
			var $deleted = $("<div>");
			var $added = $("<div>");
            Promise.all(array.map((item) => serviceProvider.getService(IViewProvider).getNode(item)))
				.then((elts) => {
					$element.children().each((i, el) => { 
						el.__view__parent = false;
						$(el).appendTo($deleted); 
					});
					
					return elts;
				}).then((elts) => {
					elts.forEach((el: any) => { 
						$element.append(el);
						el.__view__added = el.__view__parent !== false;
						el.__view__parent = element;
					});
					
					return elts;
				})
				.then((elts) => {
					$deleted.children().each((i, el: any) => { 
						el.__view__parent = undefined;
						$(el).trigger("custom:view:remove", { from: element }); 
					});
					
					return elts;
  				})
				.then((elts) => {
					elts.forEach((el: any) => { 
						if (el.__view__added) { 
							$(el).trigger("custom:view:add", { into: element });
						} 
						
						delete el.__view__added;
					});
					
					return elts;
  				});
		};
	};
}