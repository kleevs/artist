import { on } from 'on';
import { Binder } from '../core/view';

export function value(options: { get: () => string, set: (value: string) => void, on?: string}) : Binder[] { 
	return [
		on(options.on || 'input', () => (e) => { 
			var target: any = <any>e.currentTarget;
			var value = target.value;
			if (target.type == "checkbox") {
				value = target.checked;
			} 
			options.set(value); 
			return true; 
		}),
		(element: any) => () => { 
			var value = options.get();
			if (element.type == "checkbox") {
				element.checked = value;
			} else {
				element.value = value || ''
			}
		}
	];
}