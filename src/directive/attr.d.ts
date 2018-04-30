export declare function attr(valueAccessor: () => {
    [s: string]: string;
}): (element: any) => () => void;
