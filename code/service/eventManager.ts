import { Service } from '../core/service';
import { IViewProvider } from 'viewProvider';
import { dispatchEvent } from '../lib/dom/index';

class NEvent<TContext=void, TArgument=void> {
    constructor(public key: string) {}
};

export { NEvent as Event };

export abstract class IEventManager {
    abstract forEvent<T1, T2>(event: NEvent<T1, T2>): {
        listen: (context, callback: (context: T1, param: T2) => boolean) => {
            stop: (context) => void
        },
        notify: (context: T1, param: T2) => void
    };
}

@Service({
    key: IEventManager
})
export class EventManager extends IEventManager {
    constructor(private viewProvider: IViewProvider) {
        super();
    }

    public forEvent<T1, T2>(event: NEvent<T1, T2>) {
        return {
            listen: (context, callback: (context: T1, param: T2) => boolean) => {
                var fn;
                setTimeout(() => {
                    this.viewProvider.getNode(context).then(element => {
                        element && element.addEventListener(event.key, fn = (e) => {
                            var emitter = this.viewProvider.getView(<Element>e.target);
                            var stopPropagation = emitter && callback(emitter, (<any>e).data);
                            stopPropagation && e.stopPropagation();
                        });
                    });
                });

                return {
                    stop: (context) => {
                        setTimeout(() => {
                            this.viewProvider.getNode(context).then(element => {
                                element && element.removeEventListener(event.key, fn);
                            });
                        });
                    }
                }
            },

            notify: (context: T1, param: T2) => {
                if (context) {
                    this.viewProvider.getNode(context).then(e => {
                        dispatchEvent(e, event.key, param)
                    });
                }
            }
        };
    }
}