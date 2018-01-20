export declare type ViewOption<TModel> = {
    selector?: string;
    template?: string;
    html?: string;
    binding?: {
        [s: string]: (model: TModel) => ((element) => () => any) | ((element) => () => any)[];
    };
};
export declare function View<T>(options: ViewOption<T>): (constructor: Function, metadata?: any) => void;
export declare abstract class IViewProvider {
    abstract newInstance<T>(type: Function & {
        prototype: T;
    }): T;
    abstract getNode(view: any): Promise<Element>;
    abstract getView(element: Element): any;
}
export declare function view(valueAccessor: () => any): (element: any) => () => void;
