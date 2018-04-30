export declare function each(valueAccessor: () => {
    [s: string]: (element) => Function;
}[]): (element: any) => () => void;
