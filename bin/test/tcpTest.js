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
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
let socket = net.connect({
    host: "127.0.0.1",
    port: 8107,
    localPort: 61235,
}, () => {
});
let success = socket.write("test\r\n");
if (success) {
    console.log("send success");
}
setInterval(() => {
    socket.write("test3");
}, 1000);
//socket.end();
socket.on('error', (err) => {
    console.log(err);
});
socket.on('data', (data) => {
    console.log(`receive data ${data}`);
});
process.on('beforeExit', (code) => {
    socket.end();
});
