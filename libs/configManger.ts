import * as fs from "fs";

module libs.configManger {
    export class CConfigManger {
        private _SysConfig: Map<string, string | object> = new Map<string, string | object>();

        constructor() {

        }


    }
}

let configManger = new libs.configManger.CConfigManger();
export { configManger }