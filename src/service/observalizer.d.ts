export declare abstract class IObservablizer {
    abstract convert<T>(value: T & {}): T;
}
export declare class Observablizer extends IObservablizer {
    convert<T>(value: T): T;
}
