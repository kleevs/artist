import { Service } from '../core/service';

export abstract class INotifier {
    abstract forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void, 
        notify: (context: TContext, data?: TArgument) => void 
    }
}

export class Event<TContext=void, TArgument=void> {
    constructor(public key: string) {}
};

@Service({
    key: INotifier
})
export class Notifier extends INotifier {
	private _callbacks: any = {};
	
	private notify(obj, key, data): void {
		var callbacks = this.register(obj, key);
		callbacks && callbacks.forEach((callback) => {
			callback(data);
		});
	}
	
	private listen(obj: any, key: string, callback: (data: any) => void): void {
		var callbacks = this.register(obj, key);
		callbacks.push(callback);
	}
	
	forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void, 
        notify: (context: TContext, data?: TArgument) => void 
    } {
		return {
			listen: (obj: TContext, callback: (data: TArgument) => void) => this.listen(obj, event.key, callback),
			notify: (obj: TContext, data?: TArgument) => this.notify(obj, event.key, data)
		};
	}
	
	private register(obj, key) {
		obj.__notifier__id__ = obj.__notifier__id__ || [new Date().getTime(), Math.random() * 100].join(""); 
		return this._callbacks[obj.__notifier__id__ + "_" + key] = this._callbacks[obj.__notifier__id__ + "_" + key] || [];
	}
}
