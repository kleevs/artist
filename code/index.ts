import { serviceProvider } from './service';
import { IViewProvider } from './view';
import * as $ from 'node_modules/jquery/dist/jquery';

export * from 'node_modules/binder/src/index';
export * from 'node_modules/dependency-injection/src/index';
export * from './view';
export * from './service';
export function startup(selector, view) {
    var observer = new MutationObserver((records) => {
        records.forEach(record => { 
            var $removedNodes = $(record.removedNodes);
            var $addedNodes = $(record.addedNodes);
            var $removeViews = $(Array.prototype.map.call($removedNodes.filter("[artist-view=true][loaded]"), x => x).concat(
                Array.prototype.map.call($removedNodes.find("[artist-view=true][loaded]"), x => x)
            ));

            var $addedViews = $(Array.prototype.map.call($addedNodes.filter("[artist-view=true]:not([loaded])"), x => x).concat(
                Array.prototype.map.call($addedNodes.find("[artist-view=true]:not([loaded])"), x => x)
            ));

            $addedViews.attr("loaded", true);
            $removeViews.removeAttr("loaded");

            $removeViews.trigger("custom:view:dom:remove"); 
            $addedViews.trigger("custom:view:dom:added");
        });
    });

    observer.observe($("body")[0], { childList: true, subtree: true });
	var viewProvider = serviceProvider.getService(IViewProvider);
    viewProvider.getNode(viewProvider.newInstance(view)).then((el) => $(selector).append(el));
}
