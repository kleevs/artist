import { Promise } from '../polyfills/promise';
export declare function ajax<T>(options: {
    method: string;
    url: string;
    headers?: {
        [s: string]: string;
    };
    data?: any;
}): Promise<{
    result: T;
    status: string;
}>;
