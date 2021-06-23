"use strict";
const ByteBuffer = require('./bytebuffer');
const PROTO_FIELD = require('./const').PROTO_FIELD;
const zlib = require('zlib'); // 压缩
const TcpBuffer = require('./tcpBuffer');
const EventEmitter = require('events').EventEmitter;
let Logger;
class TcpServer extends EventEmitter {
    constructor(serverid, gameconfig, logger) {
        super();
        this.protocol = 'TCP';
        this.socket = null;
        this.callbacks = {};
        this.listeners = {};
        this.logoutcb = null;
        this.loginflag = false;
        this.buffer = new TcpBuffer();
        this.temphead = null;
        this.headsize = 0;
        const self = this;
        Logger = logger;
        this.id = serverid;
        this.on('pkg', function (pkg) {
            if ((1 << 1 & pkg.flag) > 0) {
                pkg.protobody = zlib.gunzipSync(pkg.protobody);
            }
            let cb = self.listeners[pkg.protoid];
            if (!!cb) {
                cb(pkg);
            }
            else {
                Logger.warn('Unknowned msg id:' + pkg.protoid);
            }
        });
    }
}
;
TcpServer.prototype.processmsg = function () {
    while (true) {
        if (this.temphead) {
            const bodybuffer = this.buffer.pop(this.temphead.protolen);
            if (!bodybuffer) {
                break;
            }
            const pkg = this.temphead;
            pkg.protobody = bodybuffer;
            Logger.debug(`开始要解的包 包头:${pkg.headbuffer.toString('hex')} 包体:${bodybuffer.toString('hex')}`);
            this.emit('pkg', pkg);
            this.temphead = null;
        }
        else {
            const headbuffer = this.buffer.pop(this.headsize);
            if (!headbuffer) {
                break;
            }
            const pkg = this.unpack(headbuffer);
            if (0 == pkg.protolen) {
                Logger.debug(`开始要解的包 包头:${headbuffer.toString('hex')} 无包体`);
                this.emit('pkg', pkg);
            }
            else {
                this.temphead = pkg;
            }
        }
    }
};
TcpServer.prototype.pack = function (EProtoId, EProtoBody) {
    let bytelen = EProtoBody == undefined ? 0 : EProtoBody.length;
    let buffer = ByteBuffer.create(this.bigendian);
    for (let field of this.head) {
        switch (field.type) {
            case PROTO_FIELD.CMD:
                buffer.writeuint(EProtoId, field.len);
                break;
            case PROTO_FIELD.LEN_EXCLUDE_HEAD:
                buffer.writeuint(bytelen, field.len);
                break;
            case PROTO_FIELD.LEN_INCLUDE_HEAD:
                buffer.writeuint(bytelen + this.headsize, field.len);
                break;
            case PROTO_FIELD.CHECKSUM:
                let checksum = this.blackboard[field.val](EProtoBody);
                buffer.writeuint(checksum, field.len);
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
};
TcpServer.prototype.unpack = function (msg) {
    if (msg.length < this.headsize) {
        throw new Error("Unexpected msg length!");
    }
    let pkg = {
        protoid: 0,
        protolen: 0,
        protobody: null,
        flag: 0,
        head: JSON.parse(JSON.stringify(this.head)),
        headbuffer: msg,
        body: {},
        length: 0
    };
    let buf = ByteBuffer.create(this.bigendian, msg);
    for (let i = 0; i < this.head.length; ++i) {
        const field = this.head[i];
        let val = buf.readuint(field.len);
        switch (field.type) {
            case PROTO_FIELD.CMD:
                pkg.protoid = val;
                break;
            case PROTO_FIELD.LEN_EXCLUDE_HEAD:
                pkg.protolen = val;
                break;
            case PROTO_FIELD.LEN_INCLUDE_HEAD:
                pkg.protolen = val - this.headsize;
                break;
            case PROTO_FIELD.FLAG:
                pkg.flag = val;
                break;
        }
        pkg.head[i].val = val;
    }
    pkg.length = this.headsize + pkg.protolen;
    return pkg;
};
module.exports = TcpServer;