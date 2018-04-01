import { observable as object } from 'node_modules/observable/src/index';
import { DependencyInjector, IProvider, IConfig } from 'node_modules/dependency-injection/src/index';
import { foreach } from './mixin';

var injector = new DependencyInjector();
export let config = injector.getConfig();
export let serviceProvider = injector.getProvider();
export let Injectable = injector.getDecorator();

export abstract class IObservablizer {
    abstract convert<T>(value: T & {}): T;
}

export abstract class INotifier {
    abstract forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => void, 
        notify: (context: TContext, data?: TArgument) => void 
    }
}

@Injectable({
    key: IObservablizer
})
class Observablizer extends IObservablizer {
    convert<T>(value: T): T {
        var res: T = value && Object.create(<{}>value) || undefined;
        value && foreach(value, (item, key) => {
            var descriptor = Object.getOwnPropertyDescriptor(value, key);
            var observable;
            !descriptor.get && !descriptor.set &&
            (() => { 
                observable = object({});
                descriptor.get = () => observable().value; 
                descriptor.set = (v) => { 
                    v instanceof Array && (v.push = function () {
                        var res = Array.prototype.push.apply(this, arguments);
                        observable({ value: this });
                        return res;
                    });

                    v instanceof Array && (v.splice = function () {
                        var res = Array.prototype.splice.apply(this, arguments);
                        observable({ value: this });
                        return res;
                    });

                    observable({ value: v }); 
                }
                
                delete descriptor.value;
                delete descriptor.writable;
                Object.defineProperty(res, key, descriptor);
                res[key] = item;
            })();
        });

        return res;
    }
}

export class Event<TContext=void, TArgument=void> {
    constructor(public key: string) {}
};

@Injectable({
    key: INotifier
})
class Notifier extends INotifier {
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

