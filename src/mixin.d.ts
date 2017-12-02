export declare function foreach<T>(item: any, callback: any): void;
export declare function map<T, T2>(array: T[], parse: (item: T) => T2): T2[];
export declare function grep<T>(array: T[], predicate: (item: T, index: number) => boolean): T[];
