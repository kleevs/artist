import { on } from 'on';
import { Binder } from '../core/view';

export function value(options: { get: () => string, set: (value: string) => void, on?: string}) : Binder[] { 
	return [
		on(options.on || 'input', () => (e) => options.set((<any>e.currentTarget).value) || true),
		(element) => () => (<any>element).value = options.get() || ''
	];
}