import { Binder } from '../core/view';

export function text(valueAccessor: () => string) : Binder { 
	return (element) => {
		return () => {
			var value = valueAccessor();
			element.innerHTML = value || '';
		};
	};
}