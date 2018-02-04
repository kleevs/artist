import { IConfig } from 'node_modules/dependency-injection/src/index';
import { observable } from 'node_modules/observable/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { IViewProvider, View, view } from './view';
import { serviceProvider, Service } from './service';

@View({
    html: "<div></div>",
    binding: {
        "this": (startView: StartView) => view(() => startView.view())
    }
})
export abstract class StartView {
    protected view: (value?: any)=>any;

    constructor(private _viewProvider: IViewProvider) {
        this.view = observable<any>();
    }

    public renderView<T>(type: Function & { prototype: T }): Promise<T> {
        return new Promise((resolve) => {
            if (type) {
                var v = this._viewProvider.newInstance(type);
                this.view(v);
                v && this._viewProvider.getNode(v).then((element) => {
                    resolve(v);
                }) || resolve(v);
            }
        });
    }
};

@Service({
    interface: StartView
})
class StartService extends StartView {            
    constructor(viewProvider: IViewProvider) {
        super(viewProvider);
    }
}