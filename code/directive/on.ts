import { Binder } from '../core/view';

export function on(event: string, valueAccessor: () => (e: Event) => boolean): Binder { 
	return (element) => {
		element.addEventListener(event, (e) => {
			var stopPropagation = valueAccessor().call(element, e);
			stopPropagation && e.stopPropagation();
        });
		
		return () => {};
	};
}