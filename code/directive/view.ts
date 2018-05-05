import { IViewProvider } from '../service/viewProvider';
import { Binder } from '../core/view';
import { createElement } from '../lib/dom/index';

export function view(valueAccessor: () => any) : Binder
export function view(valueAccessor: () => any, callback: (view: any) => void) : Binder
export function view(valueAccessor: () => any, callback?: (view: any) => void) : Binder {
	return (element, serviceProvider) => {
        element.innerHTML = "";
        
		return () => {
            var value = valueAccessor();
			var array: any[] = !value || value instanceof Array ? (value || []) : [value];
			var deleted = createElement("<div></div>");
			var added = createElement("<div></div>");
			var promises = array.map((item) => serviceProvider.getService(IViewProvider).getNode(item));
            Promise.all(promises)
				.then((elts) => {

                    (<any>element.childNodes).forEach((el) => {
						deleted.appendChild(el); 
                    });
                    
					elts.forEach((el: any) => { 
						element.appendChild(el);
					});
					
					callback && callback(value);
					return elts;
				});
		};
	};
}