import { Event } from '../../../dist/artist';
import { User } from '../model/user';
export declare abstract class IForm {
    static AddUserEvent: Event<IForm, User>;
}
