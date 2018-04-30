export declare function value(valueAccessor: {
    get: () => string;
    set: (value: string) => void;
}): (element: any) => () => void;
