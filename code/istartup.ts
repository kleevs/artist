import { IConfig } from 'node_modules/dependency-injection/src/index';
import { observable } from 'node_modules/observable/src/index';
import * as $ from 'node_modules/jquery/dist/jquery';
import { IViewProvider, View, view } from './view';
import { provider, Service } from './service';

@View({
    html: "<div></div>",
    binding: {
        "this": (startView: StartView) => view(() => startView.view())
    }
})
abstract class StartView {
    protected view: (value?: any)=>any;

    constructor(private _viewProvider: IViewProvider) {
        this.view = observable<any>();
    }

    public renderView<T>(type: Function & { prototype: T }, callback?: (view: T) => void): void {
        var v = this._viewProvider.newInstance(type);
        this.view(v);
        v && this._viewProvider.getNode(v).then((element) => {
            callback(v);
        }) || callback(v);
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

export abstract class IStartUp {
    private _starter: StartView;
    abstract onStart(config: IConfig): void;
    abstract onHashChange (hash: string, href: string): void;

    constructor(private _selector: string) {
        var viewProvider = provider.getService(IViewProvider);
        viewProvider.getNode(this._starter = viewProvider.newInstance(StartView)).then((el) => $(_selector).append(el));
    }

    public renderView<T>(type: Function & { prototype: T }, callback?: (view: T) => void): void {
        this._starter.renderView(type, callback);
    }
}