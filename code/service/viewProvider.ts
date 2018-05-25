import { Promise } from '../lib/polyfills/promise';
import { Service, config } from "../core/service";
import { IServiceProvider } from '../service/serviceProvider';
import { registeredView } from '../core/view';

/** @description Interface du service fournisseur de vue.  
 */  
export abstract class IViewProvider {

    /** @description Crée une instance de la vue qui étend la classe type.  
	 * @param {type} Class Classe de la vue à créer.
	 * @return L'instance de la vue qui étend la classe type.
	 */  
    abstract newInstance<T>(type: Function & { prototype: T }): T;
    
    /** @description Crée une instance de la vue qui étend la classe type.  
	 * @param {type} Class Classe de la vue à créer.
	 * @return L'instance de la vue qui étend la classe type.
	 */  
    abstract newInstance<T>(type: Function & { prototype: T }, arg: any): T;
    
    abstract map<T>(type: Function & { prototype: T }): (arg: any) => T;
    
    /** @description Obtient l'élément du DOM dont l'instance de vue est responsable.  
	 * @param {view} any Instance de la vue.
	 * @return L'élément du DOM dont la vue est responsable.
	 */  
    abstract getNode(view: any): Promise<Element>;

    /** @description Obtient l'instance de la vue responsable de l'élément du DOM.  
	 * @param {element} Element Elément du DOM.
	 * @return Instance de la vue.
	 */  
    abstract getView(element: Element): any;
}

@Service({
    key: IViewProvider
})
export class ViewProvider {
    constructor(private _serviceProvider: IServiceProvider) {}

	public newInstance<T>(type: Function & { prototype: T }): T;
	public newInstance<T>(type: Function & { prototype: T }, arg: any): T;
    public newInstance<T>(type: Function & { prototype: T }, arg?: any): T {
        var viewType = type && registeredView.filter((view) => (view.construct.prototype instanceof type) || (type === view.construct))[0];
        var view = viewType && (this._serviceProvider && config.getService(viewType.construct) && this._serviceProvider.createService(viewType.construct) || new viewType.construct());
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