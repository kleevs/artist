import { IConfig } from 'node_modules/dependency-injection/src/index';
import { Object, object } from 'node_modules/observable/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { IViewProvider, View } from './view';
import { provider, Service } from './service';

export abstract class IStartUp {
    abstract onStart(config: IConfig): void;
    abstract onHashChange (hash: string, href: string): void;
    protected renderView<T>(selector: string, view: Function & { prototype: T }, callback?: (view: T) => void): void {
        @View({
            html: "<div></div>",
            binding: {
                "this": (view: StartView) => (element) => {
                    return () => {
                        $(element).html(""); 
                        $(element).append(view.view());
                    }; 
                } 
            }
        })
        abstract class StartView {
            protected view: Object<any>;

            constructor() {
                this.view = object<any>();
            }
        };

        @Service({
            interface: StartView
        })
        class StartService extends StartView {            
            constructor(private _viewProvider: IViewProvider) {
                super();
                this.view = object<any>();
            }

            initialize() {
                var v = this._viewProvider.newInstance(view);
                this._viewProvider.getNode(v).then((element) => {
                    this.view(element);
                    callback(v);
                });
            }
        }

        var viewProvider = provider.getService(IViewProvider);
        viewProvider.getNode(viewProvider.newInstance(StartView)).then((el) => $(selector).append(el));
    }
}