import { Binder, BindManager } from '../core/view';
import { createElement } from '../lib/dom/index';

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

export function each(valueAccessor: () => {[s: string]: (element) => Function}[]) : Binder { 
	return (element, serviceProvider) => {
		var template = element.innerHTML;

		element.innerHTML = "";
		return () => {
			var value = valueAccessor();
			element.innerHTML = "";
			
			value.map((item) => {
				var t = createElement(template);
				foreach(item, (valueAccessor, selector) => {
					(<Element[]>(selector.trim() === "this" && [t] || t.querySelectorAll(selector))).forEach((el, i) => {
						new BindManager(el, serviceProvider).manage(valueAccessor);
					});
				});

				return t;
			}).forEach(el => element.appendChild(el));
		};
	};
}