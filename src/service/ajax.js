var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../lib/polyfills/promise", "../core/service", "../service/configManager"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("../lib/polyfills/promise");
    var service_1 = require("../core/service");
    var configManager_1 = require("../service/configManager");
    var IAjax = /** @class */ (function () {
        function IAjax() {
        }
        return IAjax;
    }());
    exports.IAjax = IAjax;
    var Ajax = /** @class */ (function (_super) {
        __extends(Ajax, _super);
        function Ajax(configManager) {
            var _this = _super.call(this) || this;
            _this.configManager = configManager;
            return _this;
        }
        Ajax.prototype.ajax = function (options) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = _this.getXMLHttpRequest();
                var configuration = _this.configManager.getConfig();
                var url = options.url;
                if (configuration && configuration.path) {
                    configuration.path.some(function (path) {
                        if (url.match(path.test)) {
                            url = url.replace(path.test, path.result);
                            return true;
                        }
                    });
                }
                xhr.open(options.method || 'GET', url, true);
                options.headers && Object.keys(options.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, options.headers[key]);
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
        };
        Ajax.prototype.getXMLHttpRequest = function () {
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
        };
        Ajax = __decorate([
            service_1.Service({
                key: IAjax
            }),
            __metadata("design:paramtypes", [configManager_1.IConfigManager])
        ], Ajax);
        return Ajax;
    }(IAjax));
    exports.Ajax = Ajax;
});
