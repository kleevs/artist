import * as $ from 'node_modules/jquery/dist/jquery';
import { Binder } from '../core/view';

export function options(valueAccessor: () => { id: string; text: string }[]) : Binder { 
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