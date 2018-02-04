import { IViewProvider } from './view';
export declare abstract class StartView {
    private _viewProvider;
    protected view: (value?: any) => any;
    constructor(_viewProvider: IViewProvider);
    renderView<T>(type: Function & {
        prototype: T;
    }): Promise<T>;
}
