const ByteBuffer = require('./bytebuffer');
const PROTO_FIELD = require('./const').PROTO_FIELD;
const TcpBuffer = require('./tcpBuffer');
const EventEmitter = require('events').EventEmitter;

export class TcpServer extends EventEmitter {
    protocol = 'TCP';
    socket = null;
    callbacks = {};
    listeners = {};
    logoutcb = null;
    loginflag = false;
    buffer = new TcpBuffer();
    temphead: any = null;
    bigendian = 1;
    headsize = 8;

    head = [{
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

    constructor(serverid: string) {
        super();
        const self: any = this;
        this.id = serverid;
        this.on('pkg', function (pkg: any) {
            let cb = self.listeners[pkg.protoid];
            if (!!cb) {
                cb(pkg);
            } else {
                console.log('Unknowned msg id:' + pkg.protoid);
            }
        });
    }
    processmsg() {
        while (true) {
            if (!this.temphead) {
                const headbuffer = this.buffer.pop(this.headsize);
                if (!headbuffer) {
                    break;
                }
                const pkg = this.unpack(headbuffer);
                if (0 == pkg.protolen) {
                    console.log(`开始要解的包 包头:${headbuffer.toString('hex')} 无包体`);
                    this.emit('pkg', pkg);
                } else {
                    this.temphead = pkg;
                }
            } else {
                const bodybuffer = this.buffer.pop(this.temphead?.protolen);
                if (!bodybuffer) {
                    break;
                }
                const pkg = this.temphead;
                pkg.protobody = bodybuffer;
                console.log(`开始要解的包 包头:${pkg.headbuffer.toString('hex')} 包体:${bodybuffer.toString('hex')}`);
                this.emit('pkg', pkg);
                this.temphead = null;
            }
        }
    }

    public unpack(msg:any) {
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
    }

    public pack(EProtoId: any, EProtoBody: string): Buffer {
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
}
