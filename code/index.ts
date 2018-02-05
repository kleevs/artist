import { StartView } from './startview';
import { serviceProvider } from './service';
import { IViewProvider } from './view';
import { IRouter } from './router';
import { IConfig } from './config';
import * as $ from 'node_modules/jquery/dist/jquery';

export * from 'node_modules/binder/src/index';
export * from 'node_modules/dependency-injection/src/index';
export * from './view';
export * from './router';
export * from './service';
export function startup(callback: (config: IConfig) => void) {
    var context: Window = window;
    var viewProvider = serviceProvider.getService(IViewProvider);
    var startview = viewProvider.newInstance(StartView);
    var href = (href) => href.replace(location.origin, "");

    $("body").on("click", "a[href]", (event) => {
        serviceProvider.getService(IRouter)
            .onNext(href(event.currentTarget.href))
            .then(view => startview.renderView(view))
            .then((view) => serviceProvider.getService(IRouter).onLoaded(href(location.href), view));
        return false;
    });
	
	$("body").on("location:href", (event, data) => {
        serviceProvider.getService(IRouter)
            .onNext(href(data.href))
            .then(view => startview.renderView(view))
            .then((view) => serviceProvider.getService(IRouter).onLoaded(href(location.href), view) || view)
			.then((view) => data.resolve(view));
        return false;
    });

    window.onpopstate = (state) => {
        serviceProvider.getService(IRouter)
            .onBack(href(location.href))
            .then(view => startview.renderView(view))
            .then((view) => serviceProvider.getService(IRouter).onLoaded(href(location.href), view));
    };

    context.addEventListener("hashchange", () => {
        serviceProvider.getService(IRouter)
            .onNext(href(location.href))
            .then(view => startview.renderView(view))
            .then((view) => serviceProvider.getService(IRouter).onLoaded(href(location.href), view));
    }, false);

    callback(serviceProvider.getService(IConfig));
    serviceProvider.getService(IRouter)
        .onNext(href(location.href))
        .then(view => startview.renderView(view))
        .then((view) => serviceProvider.getService(IRouter).onLoaded(href(location.href), view));

    viewProvider.getNode(startview).then((el) => $(serviceProvider.getService(IConfig).container).append(el));
}
