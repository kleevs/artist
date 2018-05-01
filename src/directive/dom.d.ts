export declare function dom(option: {
    in: (e: Event) => void;
    out: (e: Event) => void;
}): (element: any, serviceProvider: any) => () => void;
