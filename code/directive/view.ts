import * as $ from 'node_modules/jquery/dist/jquery';
import { IViewProvider } from '../service/viewProvider';
import { Binder } from '../core/view';

export function view(valueAccessor: () => any) : Binder
export function view(valueAccessor: () => any, callback: (view: any) => void) : Binder
export function view(valueAccessor: () => any, callback?: (view: any) => void) : Binder {
	return (element, serviceProvider: any) => {
		var $element = $(element);
        $element.html("");
        
		return () => {
            var value = valueAccessor();
			var array = !value || value instanceof Array ? (value || []) : [value];
			var $deleted = $("<div>");
			var $added = $("<div>");
            Promise.all(array.map((item) => serviceProvider.getService(IViewProvider).getNode(item)))
				.then((elts) => {

                    $element.children().each((i, el) => {
						$(el).appendTo($deleted); 
                    });
                    
					elts.forEach((el: any) => { 
						$element.append(el);
					});
					
					callback && callback(value);
					return elts;
				});
		};
	};
}