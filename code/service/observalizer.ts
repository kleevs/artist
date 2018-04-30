import { IObservablizer, Service } from '../core/service';
import { observable as object } from '../lib/observable/index';

function foreach<T>(item, callback) {
    let i;
    if (item instanceof Array) {
        for (i=0; i<item.length;i++) {
            callback(item[i], i);
        }
    } else {
        for (i in item) {
            callback(item[i], i);
        }
    }
}

@Service({
    key: IObservablizer
})
export class Observablizer extends IObservablizer {
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