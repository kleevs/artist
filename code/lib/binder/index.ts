import { observer, blind } from '../observable/index';

export class Binder {
    constructor(private element, private data = undefined) {
    }
    
    public bind(callback: (element) => Function)
    public bind(callback: (element, data: any) => Function)
    public bind(callback: (element, data: any, binder: Binder) => Function)
	public bind(callback: (element, data?: any, binder?: Binder) => Function) {
		var fn = callback(this.element, this.data, this);
        blind(() => observer(() => fn()));
    }
}