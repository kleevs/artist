import { User } from '../model/user';
export declare abstract class ISaved {
    abstract save(users: User[]): any;
}
