import { User } from '../model/user';
export declare abstract class IApp {
    abstract add(): void;
    abstract clearUser(): void;
    abstract clearUsers(): void;
    abstract save(): void;
    abstract select(user: User): void;
    abstract getSelected(): User;
    abstract getFormulaire(): User;
    abstract getUsers(): User[];
    abstract getArchived(): User[];
}
