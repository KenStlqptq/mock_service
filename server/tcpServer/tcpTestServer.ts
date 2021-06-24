import * as net from "net";
const ByteBuffer = require('./bytebuffer');
const PROTO_FIELD = require('./const').PROTO_FIELD;

const zlib = require('zlib');

var server = net.createServer(function (client) {
    client.setTimeout(5000);
    client.setEncoding('utf8');
    client.on('data', function (data) {
        console.log('Received data from client on port %d: %s', client.remotePort, data.toString());
        client.write(
            pack(1, "123").toString('Hex')
            , (err) => {
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


let head = [{
    "len": 2,
    "val": 0,
    "type": 10
}, {
    "len": 2,
    "val": 0,
    "type": 2
}, {
    "len": 2,
    "val": 0,
    "type": 1
}, {
    "len": 2,
    "val": 0,
    "type": 99
}]
function pack(EProtoId: any, EProtoBody: any) {
    let bytelen = EProtoBody == undefined ? 0 : EProtoBody.length;
    let buffer = ByteBuffer.create(1);

    for (let field of head) {
        switch (field.type) {
            case PROTO_FIELD.CMD:
                buffer.writeuint(EProtoId, field.len);
                break;
            case PROTO_FIELD.LEN_EXCLUDE_HEAD:
                buffer.writeuint(bytelen, field.len);
                break;
            case PROTO_FIELD.LEN_INCLUDE_HEAD:
                buffer.writeuint(bytelen + 8, field.len);
                break;
            default:
                buffer.writeuint(field.val, field.len);
        }
    }
    if (bytelen) {
        buffer.writebytearray(EProtoBody, bytelen); //一个整包的长度
    }
    let pack = buffer.pack();
    return pack; //缓存区pack压包
}