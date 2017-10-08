export declare abstract class ISaved {
    abstract save(person: {
        last: string;
        first: string;
        age: string;
    }[]): void;
}
