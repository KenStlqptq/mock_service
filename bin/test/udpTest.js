"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
let udp_client = dgram_1.default.createSocket('udp4');
udp_client.on('close', function () {
    console.log('udp client closed.');
});
udp_client.on('error', function () {
    console.log('some error on udp client.');
});
udp_client.on('message', function (msg, rinfo) {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
});
setInterval(function () {
    var SendBuff = 'hello 123.';
    var SendLen = SendBuff.length;
    udp_client.send(SendBuff, 0, SendLen, 5678, '127.0.0.1');
}, 3000);
