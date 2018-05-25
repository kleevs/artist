import '../lib/polyfills/promise';
import { Binder as BBinder, BindManager as BBindManager } from '../lib/binder/index';
import { IServiceProvider } from '../service/serviceProvider';
export declare type Binder = BBinder<IServiceProvider>;
/** @description Classe permettant de lier une partie du DOM à un binder
 */
export declare class BindManager extends BBindManager<IServiceProvider> {
    /** @description Constructeur de la classe.
     * @param {element} Element Elément à lier au binder.
     * @param {data} IServiceProvider Fournisseur de service de l'application.
     * @return
     */
    constructor(element: Element);
    constructor(element: Element, data: IServiceProvider);
    /** @description Applique le lien entre l'élément du DOM et le binder.
     * @param {callback} Binder Binder à lier.
     * @return void
     */
    manage(callback: Binder[]): any;
    /** @description Applique le lien entre l'élément du DOM et le binder.
     * @param {callback} Binder Binder à lier.
     * @return void
     */
    manage(callback: Binder): any;
}
export declare type ViewOption<TModel> = {
    selector?: string;
    template?: string;
    html?: string;
    binding?: {
        [s: string]: (model: TModel) => Binder | Binder[];
    };
};
export declare type RegisteredView<TModel> = {
    construct: {
        new (...args: any[]): any;
    };
    binding: {
        [s: string]: (model: TModel) => Binder | Binder[];
    };
    html: Promise<string>;
};
export declare let registeredView: RegisteredView<any>[];
export declare function View<T>(options: ViewOption<T>): (constructor: Function, metadata?: any) => void;
