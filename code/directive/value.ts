import * as $ from 'node_modules/jquery/dist/jquery';

export function value(valueAccessor: { get: () => string, set: (value: string) => void}) { 
	return (element) => {
		var $element = $(element);
		
		$element.on("input", () => {
            valueAccessor.set($element.val());
        });

		return () => {
			var value = valueAccessor.get();
			$element.val(value);
		};
	};
}