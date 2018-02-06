import { serviceProvider } from './service';
import { IViewProvider } from './view';
import * as $ from 'node_modules/jquery/dist/jquery';

export * from 'node_modules/binder/src/index';
export * from 'node_modules/dependency-injection/src/index';
export * from './view';
export * from './service';
export function startup(selector, view) {
	var viewProvider = serviceProvider.getService(IViewProvider);
    viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
}
