import * as net from "net";
import {TcpServer} from './tcpServer';

let o:any =TcpServer;
let tmp =o.pack(1,"123");


var server = net.createServer(function (client) {
    client.setTimeout(5000);
    client.setEncoding('utf8');
    client.on('data', function (data) {
        console.log('Received data from client on port %d: %s', client.remotePort, data.toString());
        client.write("test90", (err) => {
            if (err) {
                console.log(err);
            }
        });
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
server.maxConnections = 100;

server.addListener("connection", (client) => {
    client

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



