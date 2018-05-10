import { Service } from '../core/service';

declare let ActiveXObject: any;

export abstract class IAjax {
    abstract ajax<T>(options: {
        url: string;
        method?: string;
        data?: any;
        headers?: {[name:string]: string};
    }): Promise<{ result: T; status: string; }>;
}

@Service({
    key: IAjax
})
export class Ajax extends IAjax {
    constructor() {
        super();
    }

    ajax<T>(options) {
        return new Promise<{ result: T; status: string; }>((resolve, reject) => {
            var xhr = this.getXMLHttpRequest();
            xhr.open(options.method || 'GET', options.url, true);
            options.headers && Object.keys(options.headers).forEach(key => {
                xhr.setRequestHeader(key, options.headers[key]);
            });

            xhr.send(options.data);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if ((xhr.status == 200 || xhr.status == 0)) {
                        resolve({ result: xhr.responseText, status: xhr.status });
                    } else {
                        reject({ status: xhr.status, result: xhr.responseText });
                    }
                }
            };
        });
    }

    getXMLHttpRequest() {
        var xhr = null;
        var context:any = window;
        
        if (context.XMLHttpRequest || context.ActiveXObject) {
            if (context.ActiveXObject) {
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
            } else {
                xhr = new XMLHttpRequest(); 
            }
        } else {
            alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
            return null;
        }
        
        return xhr;
    }
}