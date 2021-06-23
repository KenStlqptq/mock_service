import * as net from "net";

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