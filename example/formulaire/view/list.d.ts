import { User } from '../model/user';
export declare abstract class IList {
    abstract add(user: User): any;
    static SelectUserEvent: string;
    static SaveUsersEvent: string;
}
