import { Binder } from '../core/view';
import { IRouter } from '../service/router';

export function router(): Binder { 
	return (element, serviceProvider) => {
		document.body.addEventListener("click", (e) => {
			var target = <Element>e.target;
            if (target.tagName.toLowerCase() === 'a') {
				var href = (<any>target).pathname;
				serviceProvider.getService(IRouter).trigger(href);
				e.preventDefault();
				return false;
            }
        });

		return () => {
		};
	};
}