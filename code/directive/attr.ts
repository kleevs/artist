import { Binder } from '../core/view';

export function attr(valueAccessor: () => {[s:string]: string}): Binder { 
	return (element) => { 		
		return () => {
			var value = valueAccessor();

			for (var key in value) {
				if (value[key] === undefined) {
					element.removeAttribute(key);
				} else {
					element.setAttribute(key, value[key]);
				}
			}
		};
	};
}