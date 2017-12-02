import { Object, object } from 'node_modules/observable/src/index';
import { View, view, IViewProvider, Service, IObservablizer } from '../../../src/index';
import { IForm } from '../view/form';
import { IDetail } from '../view/detail';
import { IList } from '../view/list';
import { ISaved } from '../view/saved';

export abstract class ILayout {}

@View<LayoutView>({
    template: "example/formulaire/tmpl/layout.html",
    binding: {
        "[form]": (layout) => view(() => layout.observable.form),
        "[detail]": (layout) => view(() => layout.observable.detail),
        "[list]": (layout) => view(() => layout.observable.list),
        "[saved]": (layout) => view(() => layout.observable.saved),
    }
})
abstract class LayoutView extends ILayout {
    protected readonly observable: {
        list: IList;
        saved: ISaved;
        form: IForm;
        detail: IDetail;
    };

    constructor(value: {
        list: IList;
        saved: ISaved;
        form: IForm;
        detail: IDetail;
    }) {
        super();
        this.observable = value;
    }
}

@Service({
    interface: LayoutView
})
class LayoutService extends LayoutView {
    constructor(viewProvider: IViewProvider, observalizer: IObservablizer) {
        super(observalizer.convert({
            list: viewProvider.newInstance(IList),
            saved: viewProvider.newInstance(ISaved),
            form: viewProvider.newInstance(IForm),
            detail: viewProvider.newInstance(IDetail)
        }));
        
        this.observable.form.addUser = (usr) => this.observable.list.add(usr);
        this.observable.list.saveUsers = (usrs) => this.observable.saved.save(usrs);
        this.observable.list.selectUser = (usr) => this.observable.detail.select(usr);          
    }
}
