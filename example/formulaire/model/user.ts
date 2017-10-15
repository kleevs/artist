import { Object, object } from '../../../src/index';

export class User {
    constructor() {
        this.last = object<string>();
        this.first = object<string>();
        this.age = object<number>();
    }

    public last: Object<string>;
    public first: Object<string>;
    public age: Object<number>;
}