import '../lib/polyfills/promise';
import { IViewProvider } from '../service/viewProvider';
import { Binder } from '../core/view';
import { createElement } from '../lib/dom/index';

export function view(valueAccessor: () => any) : Binder
export function view(valueAccessor: () => any, callback: (view: any) => void) : Binder
export function view(valueAccessor: () => any, options: { 
	beforeIn?: (elts: Element) => void, 
	afterIn?: (elts: Element) => void, 
	beforeOut?: (elts: Element) => void, 
	afterOut?: (elts: Element) => void,
	callback?: (view: any) => void
}) : Binder
export function view(valueAccessor: () => any, param?: any) : Binder {
	var callback = param instanceof Function && param || param && param.callback;
	var beforeIn  = param && param.beforeIn;
	var afterIn = param && param.afterIn;
	var beforeOut  = param && param.beforeOut;
	var afterOut = param && param.afterOut;

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
						beforeOut && beforeOut(el);
						deleted.appendChild(el); 
						afterOut && afterOut(el);
					});
                    
					elts.forEach((el: any) => { 
						beforeIn && beforeIn(el);
						element.appendChild(el);
						afterIn && afterIn(el);
					});
					
					callback && callback(value);
					return elts;
				});
		};
	};
}