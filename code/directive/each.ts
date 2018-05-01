import * as $ from 'node_modules/jquery/dist/jquery';
import { Binder } from '../lib/binder/index';

function foreach<T>(item, callback) {
    let i;
    if (item instanceof Array) {
        for (i=0; i<item.length;i++) {
            callback(item[i], i);
        }
    } else {
        for (i in item) {
            callback(item[i], i);
        }
    }
}

export function each(valueAccessor: () => {[s: string]: (element) => Function}[]) { 
	return (element) => {
		var $element = $(element),
			template = $element.html();

		$element.html("");
		return () => {
			var value = valueAccessor();
			$element.html("");
			
			value.forEach((item) => {
				var t = $(template);
				foreach(item, (valueAccessor, selector) => {
					(selector.trim() === "this" && t || t.find(selector)).each((i, el) => {
						new Binder(el).bind(valueAccessor);
					});
				});
				$element.append(t);
			});
		};
	};
}