/** @description Interface du service gérant la communication entre vue.
 */
export declare abstract class INotifier {
    /** @description Obtient un objet permettant d'écouter ou de lancer un évènement.
     * @param {event} Event Evènement à écouter ou lancer.
     * @return Objet permettant d'écouter ou de lancer un évènement.
     */
    abstract forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void;
        notify: (context: TContext, data?: TArgument) => void;
    };
}
/** @description Classe définissant les évènements à manipuler pour la communication entre vue.
 */
export declare class Event<TContext = void, TArgument = void> {
    key: string;
    constructor(key: string);
}
export declare class Notifier extends INotifier {
    private _callbacks;
    private notify(obj, key, data);
    private listen(obj, key, callback);
    forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void;
        notify: (context: TContext, data?: TArgument) => void;
    };
    private register(obj, key);
}
