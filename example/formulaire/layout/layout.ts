import { View } from '../../../src/index';
import { IForm } from '../view/form';
import { IDetail } from '../view/detail';
import { IList } from '../view/list';
import { ISaved } from '../view/saved';
import { Text, Value, Click, ForEach, Subview } from '../../../src/index';

export abstract class ILayout {}

@View<Layout>({
    template: "tmpl/layout.html",
    binding: {
        "[form]": [new Subview((ctx: Layout) =>  [{ type: IForm }])],
        "[detail]": [new Subview((ctx: Layout) =>  [{ type: IDetail }])],
        "[list]": [new Subview((ctx: Layout) => [{ type: IList }])],
        "[saved]": [new Subview((ctx: Layout) => [{ type: ISaved }])]
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
