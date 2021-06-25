import * as net from 'net';
import * as TcpServer from "./tcpDataConvert";

let tcpDataConvert = new TcpServer.TcpServer("1");

let server = net.createServer(function (client) {
    client.setTimeout(1000 * 60 * 3);
    client.setEncoding('utf8');
    client.on('data', function (data: Buffer) {
        let tmpData = Buffer.from(data);
        console.log('Received data from client on port %d: %s', client.remotePort, tmpData.toString('hex'));
        test(tmpData, client);
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
            let sendData = tcpDataConvert.pack(1, "");
            let sendDataStr = sendData.toString('hex');
            console.log(`Send Data ${sendDataStr}`);
            client.write(sendData, (err) => {
                if (err) console.log(err);
            });
            break;
        default:
            break;
    }
}