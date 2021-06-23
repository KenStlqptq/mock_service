"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid = __importStar(require("uuid"));
// module server.httpServer {
//     const app = express();
//     const port = 3000;
//     let obj = {
//         errorCode: 0,
//         data: {
//             name: "test"
//         }
//     };
//     app.get('/test1', (req, res) => {
//         res.sendStatus(400);
//         res.send(obj);
//     });
//     app.get('/test2', (req, res) => {
//         res.send(obj);
//     });
//     app.get('/test3', (req, res) => {
//         res.send(obj);
//     });
//     app.listen(port, () => {
//         console.log(`HttpServer listening at http://localhost:${port}`);
//     });
//   export  class httpServer extends baseServer {
//         protected _beforeInit(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _init(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _checkStart(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _start(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _startFinish(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _ServerEnter(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _ServerLeave(): boolean {
//             throw new Error("Method not implemented.");
//         }
//     }
// }
const app = express_1.default();
const port = 3000;
let obj = {
    errorCode: 0,
    data: {
        name: "test",
        token: uuid.v4()
    }
};
app.get('/request1', (req, res) => {
    res.send({
        errorCode: 1,
        data: {
            description: "bad request"
        }
    });
    res.end();
});
app.get('/request2', (req, res) => {
    res.send(obj);
    res.end();
});
app.get('/request3', (req, res) => {
    res.send(obj);
    res.end();
});
app.listen(port, () => {
    console.log(`HttpServer listening at http://localhost:${port}`);
});
