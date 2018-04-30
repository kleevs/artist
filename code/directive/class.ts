import * as $ from 'node_modules/jquery/dist/jquery';

export function classes(valueAccessor: () => {[s:string]: boolean}) { 
	return (element) => { 
		var $element = $(element);
		
		return () => {
			var value = valueAccessor();

			for (var key in value) {
				if (value[key]) {
					$element.addClass(key);
				} else {
					$element.removeClass(key);
				}
			}
		};
	};
}