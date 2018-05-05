import { Binder } from '../core/view';
import { on } from 'on';

export function dom(option: { in: (e: Event) => void, out: (e: Event) => void }) : Binder[] {
    return [
        on('custom:view:dom:remove', () => (e) => { 
            if (e.target === e.currentTarget) {
                option.out(e);
                return true;
            }

            return false;
        }),
        on('custom:view:dom:added', () => (e) => {
            if (e.target === e.currentTarget) {
                option.in(e);
                return true;
            }

            return false;
        })
    ];
}