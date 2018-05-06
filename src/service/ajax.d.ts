export declare abstract class IAjax {
    abstract ajax<T>(options: {
        url: string;
        method?: string;
        data?: any;
        headers?: {
            [name: string]: string;
        };
    }): Promise<{
        result: T;
        status: string;
    }>;
}
export declare class Ajax extends IAjax {
    constructor();
    ajax<T>(options: any): Promise<{
        result: T;
        status: string;
    }>;
    getXMLHttpRequest(): any;
}
