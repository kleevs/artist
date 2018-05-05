import { Binder } from '../core/view';
import { createElement } from '../lib/dom/index';

export function options(valueAccessor: () => { id: string; text: string }[]) : Binder { 
	return (element) => {
        element.innerHTML = "";
		
		return () => {
			var value = valueAccessor();

			element.innerHTML = "";
			value.map((item) => {
				var opt = createElement("<option></option>");
				(<any>opt).value = item.id;
				opt.textContent = item.text;
				return opt;
			}).forEach(o => element.appendChild(o));
		};
	};
}