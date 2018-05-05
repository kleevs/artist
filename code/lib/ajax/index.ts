declare let ActiveXObject: any;

function getXMLHttpRequest() {
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

export function ajax<T>(options: {
    method: string;
    url: string;
    headers?: {[s: string]: string},
    data?: any;
}) {
    return new Promise<{ result: T, status: string }>((resolve, reject) => {
        var xhr = getXMLHttpRequest();
        xhr.open(options.method, options.url, true);
        options.headers && Object.keys(options.headers).forEach(key => {
            var header = options.headers[key];
            xhr.setRequestHeader(key, header);
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