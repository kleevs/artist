import * as $ from 'node_modules/jquery/dist/jquery';

export function click(valueAccessor: () => (e: Event) => boolean) { 
	return (element) => {
		$(element).click((e) => {
            return valueAccessor().call(element, e);
        });
		
		return () => {};
	};
}