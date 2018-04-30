import * as $ from 'node_modules/jquery/dist/jquery';

export function change(valueAccessor: () => (e: Event) => boolean) { 
	return (element) => {
		$(element).change((e) => {
            return valueAccessor().call(element, e);
        });
		
		return () => {};
	};
}