import { Service } from '../core/service';

export declare type Listener = {
	stop: () => void;
}

/** @description Interface du service gérant la communication entre vue.  
 */  
export abstract class INotifier {

	/** @description Obtient un objet permettant d'écouter ou de lancer un évènement.  
	 * @param {event} Event Evènement à écouter ou lancer.
	 * @return Objet permettant d'écouter ou de lancer un évènement.
	 */  
    abstract forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => Listener, 
        notify: (context: TContext, data?: TArgument) => void 
    }
}

/** @description Classe définissant les évènements à manipuler pour la communication entre vue.  
 */ 
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
	
	private listen(obj: any, key: string, callback: (data: any) => void): Listener {
		var callbacks = this.register(obj, key);
		callbacks.push(callback);
		return {
			stop: () => {
				var index = callbacks.indexOf(callback);
				if (index > -1) {
					callbacks.splice(index, 1);
				}
			}
		};
	}
	
	forEvent<TContext, TArgument>(event: Event<TContext, TArgument>): {
        listen: (context: TContext, callback: (data: TArgument) => void) => Listener, 
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
