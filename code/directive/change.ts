import { Binder } from '../core/view';
import { on } from 'on';

export function change(valueAccessor: () => (e: Event) => boolean): Binder { 
	return on('change', valueAccessor);
}