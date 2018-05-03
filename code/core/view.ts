import { Binder as BBinder, BindManager as BBindManager } from '../lib/binder/index';
import { serviceProvider, Service } from './service';
import { IServiceProvider } from '../service/serviceProvider';
import * as $ from 'node_modules/jquery/dist/jquery';

function foreach<T>(item: { [s:string]: T }, callback: (item: T, key: string) => void) {
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

export declare type Binder = BBinder<IServiceProvider>;

export class BindManager extends BBindManager<IServiceProvider> {}

export declare type ViewOption<TModel> = {
    selector?: string,
    template?: string,
    html?: string,
    binding?: { [s:string]: (model: TModel) => Binder | Binder[] }
};

export declare type RegisteredView<TModel> = {
    construct: {new(...args:any[]): any},
    binding: { [s:string]: (model: TModel) => Binder | Binder[] }
    html: Promise<string> 
};

export let registeredView: RegisteredView<any>[] = [];

export function View<T>(options: ViewOption<T>) { 
    return (constructor: Function, metadata?) => {
        options = constructor.prototype.__view__option__ = $.extend(true, constructor.prototype.__view__option__, options);
        var viewType: RegisteredView<any>;
		registeredView.push(viewType = {
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

		var key = constructor;
		while (key && key.constructor !== key) {
			(<any>Service({ 
				key: key, 
				registerable: false, 
				initialize: (view) => {
					var binding = viewType.binding;

					view && view.initialize && view.initialize();
					viewType && (view.__elt__ = viewType.html.then(template => {
						var t = $(template);
						t.attr("artist-view", true);
						foreach(binding, (valueAccessor, selector) => {
							(selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
								var binder = valueAccessor(view);
								var binders = binder && !(binder instanceof Array) && <Binder[]>[binder] || <Binder[]>binder;
								binders.forEach(b => new BindManager(el, serviceProvider).manage(b));
							});
						});

						t[0].__view__ = view;
						return t[0];
					}));
				}
			}))(<any>constructor, metadata);
			key = Object.getPrototypeOf(key);
		}
    };
}
