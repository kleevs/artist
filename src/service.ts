import { object } from 'node_modules/observable/src/index';
import { DependencyInjector, IProvider, IConfig } from 'node_modules/dependency-injection/src/index';
import { foreach } from './mixin';

var injector = new DependencyInjector();
export let config = injector.getConfig();
export let provider = injector.getProvider();
export let Service = injector.getDecorator();

export abstract class IObservablizer {
    abstract convert<T>(value: T & {}): T;
}

@Service({
    interface: IObservablizer
})
class Observablizer extends IObservablizer {
    convert<T>(value: T): T {
        var res: T = value && Object.create(<{}>value) || undefined;
        value && foreach(value, (item, key) => {
            var descriptor = Object.getOwnPropertyDescriptor(value, key);
            var observable;
            !descriptor.get && !descriptor.set &&
            (() => { 
                observable = object();
                descriptor.get = () => observable(); 
                descriptor.set = (v) => { 
                    v instanceof Array && (v.push = function () {
                        var res = Array.prototype.push.apply(this, arguments);
                        observable(this);
                        return res;
                    });

                    observable(v); 
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


