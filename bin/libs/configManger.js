"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configManger = void 0;
var libs;
(function (libs) {
    var configManger;
    (function (configManger) {
        class CConfigManger {
            constructor() {
                this._SysConfig = new Map();
            }
        }
        configManger.CConfigManger = CConfigManger;
    })(configManger = libs.configManger || (libs.configManger = {}));
})(libs || (libs = {}));
let configManger = new libs.configManger.CConfigManger();
exports.configManger = configManger;
