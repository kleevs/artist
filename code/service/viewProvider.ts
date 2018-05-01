import { Service, config } from "../core/service";
import { IServiceProvider } from '../service/serviceProvider';
import { registeredView } from '../core/view';

export abstract class IViewProvider {
	abstract newInstance<T>(type: Function & { prototype: T }): T;
	abstract newInstance<T>(type: Function & { prototype: T }, arg: any): T;
	abstract map<T>(type: Function & { prototype: T }): (arg: any) => T;
    abstract getNode(view: any): Promise<Element>;
    abstract getView(element: Element): any;
}

@Service({
    key: IViewProvider
})
export class ViewProvider {
    constructor(private _serviceProvider: IServiceProvider) {}

	public newInstance<T>(type: Function & { prototype: T }): T;
	public newInstance<T>(type: Function & { prototype: T }, arg: any): T;
    public newInstance<T>(type: Function & { prototype: T }, arg?: any): T {
        var viewType = type && registeredView.filter((view) => (view.construct.prototype instanceof type) || (type === view.construct))[0];
        var view = viewType && (this._serviceProvider && config.getService(viewType.construct) && this._serviceProvider.createService(viewType.construct) || new viewType.construct());
		return view;
    }
	
	public map<T>(type: Function & { prototype: T }): (arg: any) => T {
		return (arg: any) => this.newInstance(type, arg);
	}

    public getNode(view: any): Promise<Element> {
        return view && view.__elt__;
    }

    public getView(element: Element): any {
        return element && (<any>element).__view__;
    }
}