import { User } from '../model/user';
export declare abstract class IList {
    abstract add(user: User): any;
    selectUser: (user: User) => void;
    saveUsers: (users: User[]) => void;
}
