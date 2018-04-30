import * as $ from 'node_modules/jquery/dist/jquery';

export function attr(valueAccessor: () => {[s:string]: string}) { 
	return (element) => { 
		var $element = $(element);
		
		return () => {
			var value = valueAccessor();

			for (var key in value) {
				if (value[key] === undefined) {
					$element.removeAttr(key);
				} else {
					$element.attr(key, value[key]);
				}
			}
		};
	};
}