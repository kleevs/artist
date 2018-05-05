import { Binder } from '../core/view';
import { on } from 'on';

export function click(valueAccessor: () => (e: Event) => boolean): Binder { 
	return on('click', valueAccessor);
}