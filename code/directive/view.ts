import * as $ from 'node_modules/jquery/dist/jquery';
import { IViewProvider } from '../service/viewProvider';

export function view(valueAccessor: () => any) {
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
					
					return elts;
				});
		};
	};
}