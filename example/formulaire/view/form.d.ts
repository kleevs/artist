import { Event } from 'artist';
import { User } from '../model/user';
export declare abstract class IForm {
    static AddUserEvent: Event<IForm, User>;
}
