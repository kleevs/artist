import * as $ from 'node_modules/jquery/dist/jquery';

export function input(valueAccessor: () => (e: Event) => boolean) { 
	return (element) => {
		$(element).on('input', (e) => {
            return valueAccessor().call(element, e);
        });
		
		return () => {};
	};
}