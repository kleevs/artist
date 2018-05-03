import * as $ from 'node_modules/jquery/dist/jquery';
import { Binder } from '../core/view';

export function change(valueAccessor: () => (e: Event) => boolean): Binder { 
	return (element) => {
		$(element).change((e) => {
            return valueAccessor().call(element, e);
        });
		
		return () => {};
	};
}