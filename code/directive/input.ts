import * as $ from 'node_modules/jquery/dist/jquery';
import { Binder } from '../core/view';

export function input(valueAccessor: () => (e: Event) => boolean) : Binder { 
	return (element) => {
		$(element).on('input', (e) => {
            return valueAccessor().call(element, e);
        });
		
		return () => {};
	};
}