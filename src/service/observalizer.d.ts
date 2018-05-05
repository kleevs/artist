/** @description Interface du service gérant la création d'objet observable.
 */
export declare abstract class IObservablizer {
    /** @description Crée un observable ayant les valeurs de l'objet passé en paramètre.
     * @param {value} Object Objet à convertir en observable.
     * @return Observable.
     */
    abstract convert<T extends {
        [s: string]: any;
    }>(value: T): T;
}
export declare class Observablizer extends IObservablizer {
    convert<T>(value: T): T;
}
