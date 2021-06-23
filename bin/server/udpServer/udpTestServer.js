"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = __importDefault(require("dgram"));
let udp_server = dgram_1.default.createSocket('udp4');
udp_server.bind(5678);
udp_server.on('listening', function () {
    console.log('udp server linstening 5678.');
});
udp_server.on('message', function (msg, rinfo) {
    let strmsg = msg.toString();
    udp_server.send(strmsg, 0, strmsg.length, rinfo.port, rinfo.address);
    console.log(`udp server received data: ${strmsg} from ${rinfo.address}:${rinfo.port}`);
});
udp_server.on('error', function (err) {
    console.log('some error on udp server.');
    udp_server.close();
});
