import { Promise } from '../lib/polyfills/promise';
import { Binder as BBinder, BindManager as BBindManager } from '../lib/binder/index';
import { createElement } from '../lib/dom/index';
import { serviceProvider, Service } from './service';
import { IServiceProvider } from '../service/serviceProvider';
import { IAjax } from '../service/ajax';


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

/** @description Classe permettant de lier une partie du DOM à un binder
 */  
export class BindManager extends BBindManager<IServiceProvider> {

    /** @description Constructeur de la classe.  
     * @param {element} Element Elément à lier au binder. 
     * @param {data} IServiceProvider Fournisseur de service de l'application.  
     * @return
     */  
    constructor(element: Element);
    constructor(element: Element, data: IServiceProvider);
    constructor(element: Element, data: IServiceProvider = undefined) {
        super(element, data);
    }
    
    /** @description Applique le lien entre l'élément du DOM et le binder.  
     * @param {callback} Binder Binder à lier.
     * @return void
     */  
    public manage(callback: Binder[]);

    /** @description Applique le lien entre l'élément du DOM et le binder.  
     * @param {callback} Binder Binder à lier.
     * @return void
     */  
    public manage(callback: Binder);

    /** @description Applique le lien entre l'élément du DOM et le binder.  
     * @param {callback} Binder Binder à lier.
     * @return void
     */  
    public manage(callback: Binder | Binder[]) {
		super.manage(<Binder>callback);
    }
}

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
        options = constructor.prototype.__view__option__ = Object.assign({}, constructor.prototype.__view__option__, options);
        var viewType: RegisteredView<any>;
		registeredView.push(viewType = {
            construct: <any>constructor,
            binding: options.binding,
            html: new Promise<string>((resolve, reject) => {
                options.html && resolve(options.html);
                options.template && !options.html && (() => {
                    serviceProvider.getService(IAjax).ajax<string>({ url: `/${options.template}`, method: 'GET' }).then((response) => { 
                        response.status == "error" && (reject() || true) ||
                        resolve(response.result);
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
						var t = createElement(template);
						t.setAttribute("artist-view", "true");
						foreach(binding, (valueAccessor, selector) => {
							(<Element[]>(selector.trim() === "this" && [t] || t.querySelectorAll(selector))).forEach((el) => {
								var binder = valueAccessor(view);
								var binders = binder && !(binder instanceof Array) && <Binder[]>[binder] || <Binder[]>binder;
								binders.forEach(b => new BindManager(el, serviceProvider).manage(b));
							});
						});

						(<any>t).__view__ = view;
						return t;
					}));
				}
			}))(<any>constructor, metadata);
			key = Object.getPrototypeOf(key);
		}
    };
}
