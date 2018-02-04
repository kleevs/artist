export declare class Cache<T> {
    private readonly cache;
    promise(key: string, func: (resolve, reject) => void): Promise<{}>;
}
