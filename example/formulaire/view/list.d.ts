import { Event } from '../../../dist/artist';
import { User } from '../model/user';
export declare abstract class IList {
    abstract add(user: User): any;
    static SelectUserEvent: Event<IList, User>;
    static SaveUsersEvent: Event<IList, User[]>;
}
