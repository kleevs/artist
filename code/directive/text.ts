import * as $ from 'node_modules/jquery/dist/jquery';
import { Binder } from '../core/view';

export function text(valueAccessor: () => string) : Binder { 
	return (element) => {
		var $element = $(element);

		return () => {
			var value = valueAccessor();
			$element.text(value);
		};
	};
}