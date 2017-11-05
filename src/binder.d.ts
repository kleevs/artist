import { BindingHandler, Binder } from 'node_modules/binder/src/index';
import { Object } from 'node_modules/observable/src/index';
export { BindingHandler };
export declare type ForeachType<TModel> = {
    array: any[];
    config: {
        [s: string]: AbstractBinder<any, TModel>[];
    };
};
export declare abstract class AbstractBinder<T, TModel> extends Binder<T, TModel> {
    constructor(handler: {
        prototype: BindingHandler<T, TModel>;
    } & {
        new (): any;
    }, valueAccessor: (ctx: TModel) => T);
}
export declare class Attr<TModel> extends AbstractBinder<any, TModel> {
    constructor(valueAccessor: (ctx: TModel) => any);
}
export declare class Change<TModel> extends AbstractBinder<(e: Event) => boolean, TModel> {
    constructor(valueAccessor: (ctx: TModel) => (e: Event) => boolean);
}
export declare class Click<TModel> extends AbstractBinder<(e: Event) => boolean, TModel> {
    constructor(valueAccessor: (ctx: TModel) => (e: Event) => boolean);
}
export declare class ForEach<TModel> extends AbstractBinder<ForeachType<TModel>, TModel> {
    constructor(valueAccessor: (ctx: TModel) => ForeachType<TModel>);
}
export declare class Htmls<TModel> extends AbstractBinder<{
    template: string;
    model: any;
    config: {
        [s: string]: Binder<any, TModel>[];
    };
}[], TModel> {
    constructor(valueAccessor: (ctx: TModel) => {
        template: string;
        model: any;
        config: {
            [s: string]: Binder<any, TModel>[];
        };
    }[]);
}
export declare class Options<TModel> extends AbstractBinder<{
    id: string;
    text: string;
}[], TModel> {
    constructor(valueAccessor: (ctx: TModel) => {
        id: string;
        text: string;
    }[]);
}
export declare class Text<TModel> extends AbstractBinder<string, TModel> {
    constructor(valueAccessor: (ctx: TModel) => string);
}
export declare class Value<TModel> extends AbstractBinder<(value?: string) => Object<any>, TModel> {
    constructor(valueAccessor: (ctx: TModel) => Object<any>);
}
export declare class Subview<TModel> extends AbstractBinder<{
    type: any;
    callback?: (view: any) => void;
}[], TModel> {
    constructor(valueAccessor: (ctx: TModel) => {
        type: any;
        callback?: (view: any) => void;
    }[]);
}
