import { User } from '../model/user';
export declare abstract class IDetail {
    abstract select(user: User): any;
}
