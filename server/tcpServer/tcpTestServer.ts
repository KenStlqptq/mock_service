import * as net from 'net';
import * as TcpServer from "./tcpDataConvert";

let tcpDataConvert = new TcpServer.TcpServer("1");

let server = net.createServer(function (client) {
    client.setTimeout(5000);
    client.setEncoding('utf8');
    client.on('data', function (data: string) {
        console.log(`Source Data:${data}`);
        if (data && data != "") {
            let bufferData = Buffer.from(data, 'hex');
            console.log('Received data from client on port %d: %s', client.remotePort, data);
            test(bufferData, client);
        }
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

console.log(server.address());
server.maxConnections = 100;
server.addListener("connection", (client) => {

});


server.listen({ host: "0.0.0.0", port: 3002 }, function () {
    console.log('Server listening: ' + JSON.stringify(server.address()));
    server.on('close', function () {
        console.log('Server Terminated');
    });
    server.on('error', function (err) {
        console.log('Server Error:', JSON.stringify(err));
    });
});

function test(data: Buffer, client: net.Socket) {
    let content = tcpDataConvert.unpack(data);
    let reqID = content?.head[0]?.val;
    if (!reqID) return;
    switch (reqID) {
        case 1:
            client.write(
                tcpDataConvert.pack(1, "test").toString('hex'), (err) => {
                    if (err) console.log(err);
                });
            break;
        default:
            break;
    }
}