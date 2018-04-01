import { View, view, IViewProvider, IObservablizer, INotifier } from '../../../dist/artist';
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

    constructor(viewProvider: IViewProvider, observalizer: IObservablizer, notifier: INotifier) {
        super();

        this.observable = observalizer.convert({
            list: viewProvider.newInstance(IList),
            saved: viewProvider.newInstance(ISaved),
            form: viewProvider.newInstance(IForm),
            detail: viewProvider.newInstance(IDetail)
        });

        notifier.forEvent(IForm.AddUserEvent).listen(this.observable.form, (usr) => this.observable.list.add(usr));
        notifier.forEvent(IList.SaveUsersEvent).listen(this.observable.list, (usrs) => this.observable.saved.save(usrs));
        notifier.forEvent(IList.SelectUserEvent).listen(this.observable.list, (usr) => this.observable.detail.select(usr));     
    }
}
