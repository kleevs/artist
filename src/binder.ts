import * as binder from 'node_modules/binder/src/index';
import { BindingHandler, Binder } from 'node_modules/binder/src/index';
import { Object } from 'node_modules/observable/src/index';
import { SubviewHandler } from './view';

export { BindingHandler };

export declare type ForeachType<TModel> = {
    array: any[];
    config: {
        [s: string]: AbstractBinder<any, TModel>[];
    };
};

export abstract class AbstractBinder<T, TModel> extends Binder<T, TModel> {
    constructor(handler: { prototype: BindingHandler<T, TModel> } & { new ():any }, valueAccessor: (ctx: TModel) => T) {
        super(handler, valueAccessor);
    }
}

export class Attr<TModel> extends AbstractBinder<any, TModel> {
    constructor(valueAccessor: (ctx: TModel) => any) {
        super(binder.Attr, valueAccessor);
    }
}

export class Change<TModel> extends AbstractBinder<(e: Event) => boolean, TModel> {
    constructor(valueAccessor: (ctx: TModel) => (e: Event) => boolean) {
        super(binder.Change, valueAccessor);
    }
}

export class Click<TModel> extends AbstractBinder<(e: Event) => boolean, TModel> {
    constructor(valueAccessor: (ctx: TModel) => (e: Event) => boolean) {
        super(binder.Click, valueAccessor);
    }
}

export class ForEach<TModel> extends AbstractBinder<ForeachType<TModel>, TModel> {
    constructor(valueAccessor: (ctx: TModel) => ForeachType<TModel>) {
        super(binder.ForEach, valueAccessor);
    }
}

export class Htmls<TModel> extends AbstractBinder<{ template: string, model: any, config: { [s:string]: Binder<any, TModel>[] } }[], TModel> {
    constructor(valueAccessor: (ctx: TModel) => { template: string, model: any, config: { [s:string]: Binder<any, TModel>[] } }[]) {
        super(binder.Htmls, valueAccessor);
    }
}

export class Options<TModel> extends AbstractBinder<{ id: string; text: string }[], TModel> {
    constructor(valueAccessor: (ctx: TModel) => { id: string; text: string }[]) {
        super(binder.Options, valueAccessor);
    }
}

export class Text<TModel> extends AbstractBinder<string, TModel> {
    constructor(valueAccessor: (ctx: TModel) => string) {
        super(binder.Text, valueAccessor);
    }
}

export class Value<TModel> extends AbstractBinder<(value?:string) => Object<any>, TModel> {
    constructor(valueAccessor: (ctx: TModel) => Object<any>) {
        super(binder.Value, valueAccessor);
    }
}

export class Subview<TModel> extends AbstractBinder<{ type: any, callback?: (view: any) => void }[], TModel> {
    constructor(valueAccessor: (ctx: TModel) => { type: any, callback?: (view: any) => void }[]) {
        super(SubviewHandler, valueAccessor);
    }
}