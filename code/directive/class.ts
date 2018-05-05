import { Binder } from '../core/view';

function addClass(element: Element, className: string) {
    var arr = element.className.split(" ");
    if (arr.indexOf(className) == -1) {
        element.className += " " + className;
    }
}

function removeClass(element: Element, className: string) {
	var arr = element.className.split(" ");
	arr = arr.filter(name => name !== className);
	element.className = arr.join(' ');
}

export function classes(valueAccessor: () => {[s:string]: boolean}) : Binder { 
	return (element) => {
		return () => {
			var value = valueAccessor();

			for (var key in value) {
				if (value[key]) {
					addClass(element, key);
				} else {
					removeClass(element, key);
				}
			}
		};
	};
}