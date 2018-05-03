import * as $ from 'node_modules/jquery/dist/jquery';
import { Binder } from '../core/view';

export function click(valueAccessor: () => (e: Event) => boolean) : Binder { 
	return (element) => {
		$(element).click((e) => {
            return valueAccessor().call(element, e);
        });
		
		return () => {};
	};
}