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
const http = __importStar(require("http"));
const app = express_1.default();
const port = 3000;
let httpServer = http.createServer(app);
app.setMaxListeners(100);
app.get('/errorRequest', (req, res) => {
    res.send({
        errorCode: 100,
        data: {
            description: "bad request"
        }
    });
    res.end();
});
app.get('/normalRequest', (req, res) => {
    res.send({
        errorCode: 0,
        data: {
            name: "test",
            time: Date.now(),
            token: uuid.v4()
        }
    });
    res.end();
});
app.get('/timeoutRequest', (req, res) => {
});
app.get('/test', (req, res) => {
    res.send({
        errorCode: 0,
        data: {
            name: "test2"
        }
    });
    res.end();
});
httpServer.listen(port);
