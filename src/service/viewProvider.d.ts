import { IServiceProvider } from '../service/serviceProvider';
/** @description Interface du service fournisseur de vue.
 */
export declare abstract class IViewProvider {
    /** @description Crée une instance de la vue qui étend la classe type.
     * @param {type} Class Classe de la vue à créer.
     * @return L'instance de la vue qui étend la classe type.
     */
    abstract newInstance<T>(type: Function & {
        prototype: T;
    }): T;
    /** @description Crée une instance de la vue qui étend la classe type.
     * @param {type} Class Classe de la vue à créer.
     * @return L'instance de la vue qui étend la classe type.
     */
    abstract newInstance<T>(type: Function & {
        prototype: T;
    }, arg: any): T;
    abstract map<T>(type: Function & {
        prototype: T;
    }): (arg: any) => T;
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
export declare class ViewProvider {
    private _serviceProvider;
    constructor(_serviceProvider: IServiceProvider);
    newInstance<T>(type: Function & {
        prototype: T;
    }): T;
    newInstance<T>(type: Function & {
        prototype: T;
    }, arg: any): T;
    map<T>(type: Function & {
        prototype: T;
    }): (arg: any) => T;
    getNode(view: any): Promise<Element>;
    getView(element: Element): any;
}
