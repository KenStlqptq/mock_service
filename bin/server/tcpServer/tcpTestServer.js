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
var server = net.createServer(function (client) {
    // console.log(' Client connection:');
    // console.log(' local= %s:%s',client.localAddress,client.localPort);
    // console.log(' remote= %s:%s',client.remoteAddress,client.remotePort);
    client.setTimeout(5000);
    client.setEncoding('utf8');
    client.on('data', function (data) {
        console.log('Received data from client on port %d: %s', client.remotePort, data.toString());
        // console.log('Bytes received:', client.bytesRead);
        // console.log(' Bytes sent:' + client.bytesWritten);
    });
    client.on('end', function () {
        console.log('Client disconnected');
        server.getConnections(function (err, count) {
            console.log('Remaining Connection:' + count);
        });
    });
    client.on('error', function (err) {
        console.log('Socket Error:', JSON.stringify(err));
    });
    client.on('timeout', function () {
        console.log('Socket Timed Out');
    });
});
server.listen(8107, function () {
    console.log('Server listening: ' + JSON.stringify(server.address()));
    server.on('close', function () {
        console.log('Server Terminated');
    });
    server.on('error', function (err) {
        console.log('Server Error:', JSON.stringify(err));
    });
});
