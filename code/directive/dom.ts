import { Binder } from '../core/view';
import { on } from 'on';

export function dom(option: { in: (e: Event) => void, out: (e: Event) => void }) : Binder {
    return (element, serviceProvider) => {
        var fns = [
            on('custom:view:dom:remove', () => (e) => { 
                if (e.target === e.currentTarget) {
                    option.out(e);
                    return true;
                }

                return false;
            })(element, serviceProvider),
            on('custom:view:dom:added', () => (e) => {
                if (e.target === e.currentTarget) {
                    option.in(e);
                    return true;
                }

                return false;
            })(element, serviceProvider)
        ];

        return () => fns.map(fn => fn());
    }
}