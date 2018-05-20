(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getXMLHttpRequest() {
        var xhr = null;
        var context = window;
        if (context.XMLHttpRequest || context.ActiveXObject) {
            if (context.ActiveXObject) {
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                }
                catch (e) {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }
            else {
                xhr = new XMLHttpRequest();
            }
        }
        else {
            alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
            return null;
        }
        return xhr;
    }
    function ajax(options) {
        return new Promise(function (resolve, reject) {
            var xhr = getXMLHttpRequest();
            xhr.open(options.method, options.url, true);
            options.headers && Object.keys(options.headers).forEach(function (key) {
                var header = options.headers[key];
                xhr.setRequestHeader(key, header);
            });
            xhr.send(options.data);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if ((xhr.status == 200 || xhr.status == 0)) {
                        resolve({ result: xhr.responseText, status: xhr.status });
                    }
                    else {
                        reject({ status: xhr.status, result: xhr.responseText });
                    }
                }
            };
        });
    }
    exports.ajax = ajax;
});
