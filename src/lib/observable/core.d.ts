export declare function observable<T>(fn: () => T): () => T;
export declare function observer<T>(fn: () => T): void;
export declare function blind<T>(fn: () => T): void;
