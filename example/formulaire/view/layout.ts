import { View } from '../../../src/index';
import { IForm } from './form';
import { IDetail } from './detail';
import { IList } from './list';
import { ISaved } from './saved';
import { Text, Value, Click, ForEach, Subview } from '../../../src/index';

export abstract class ILayout {}

@View<Layout>({
    template: "tmpl/layout.html",
    binding: {
        "[form]": [new Subview((ctx: Layout) =>  [{ type: IForm, constructor: (form: IForm) =>  form.parent = ctx }])],
        "[detail]": [new Subview((ctx: Layout) =>  [{ type: IDetail, constructor: (detail: IDetail) =>  detail.parent = ctx }])],
        "[list]": [new Subview((ctx: Layout) => [{ type: IList, constructor: (list: IList) => { ctx.list = list; list.parent = ctx; } }])],
        "[saved]": [new Subview((ctx: Layout) => [{ type: ISaved, constructor: (saved: ISaved) =>  ctx.saved = saved }])]
    }
})
class Layout extends ILayout {
    private list: IList;
    private saved: ISaved;

    constructor() {
        super();
    }

    public add(person: { last: string, first: string, age: string }) {
        this.list && this.list.add(person);
    }

    public save(persons: { last: string, first: string, age: string }[]) {
        this.saved && this.saved.save(persons);
    }

    public selected() {
        return this.list.selected();
    }
}
