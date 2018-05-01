import * as $ from 'node_modules/jquery/dist/jquery';

export function options(valueAccessor: () => { id: string; text: string }[]) { 
	return (element) => {
		var $element = $(element);
        $element.html("");
		
		return () => {
			var value = valueAccessor();

			$element.html("");
			$element.append(value.map((item) => {
				var $opt = $("<option>");
				$opt.val(item.id);
				$opt.text(item.text);
				return $opt;
			}));
			$element.val($element.data("value"));
		};
	};
}