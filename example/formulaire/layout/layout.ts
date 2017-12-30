import { View, view, IViewProvider, Service, IObservablizer, INotifier } from '../../../src/index';
import { IForm } from '../view/form';
import { IDetail } from '../view/detail';
import { IList } from '../view/list';
import { ISaved } from '../view/saved';

export abstract class ILayout {}

@View<LayoutView>({
    template: "formulaire/tmpl/layout.html",
    binding: {
        "[form]": (layout) => view(() => layout.observable.form),
        "[detail]": (layout) => view(() => layout.observable.detail),
        "[list]": (layout) => view(() => layout.observable.list),
        "[saved]": (layout) => view(() => layout.observable.saved),
    }
})
class LayoutView extends ILayout {
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
    constructor(viewProvider: IViewProvider, observalizer: IObservablizer, notifier: INotifier) {
        super(observalizer.convert({
            list: viewProvider.newInstance(IList),
            saved: viewProvider.newInstance(ISaved),
            form: viewProvider.newInstance(IForm),
            detail: viewProvider.newInstance(IDetail)
        }));
        
		notifier.listen(this.observable.form, IForm.AddUserEvent, (usr) => this.observable.list.add(usr));
		notifier.listen(this.observable.list, IList.SaveUsersEvent, (usrs) => this.observable.saved.save(usrs));
		notifier.listen(this.observable.list, IList.SelectUserEvent, (usr) => this.observable.detail.select(usr));       
    }
}
