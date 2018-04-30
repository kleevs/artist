import * as $ from 'node_modules/jquery/dist/jquery';

export function text(valueAccessor: () => string) { 
	return (element) => {
		var $element = $(element);

		return () => {
			var value = valueAccessor();
			$element.text(value);
		};
	};
}