"use strict";
class TcpBuffer {
    constructor() {
        this.bufferlen = 65536;
        this.datalen = 0;
        this.buffer = Buffer.alloc(this.bufferlen);
        this.writepos = 0;
        this.readpos = 0;
    }
}
;
TcpBuffer.prototype.getdatalen = function () {
    let len = 0;
    // 缓存全满
    if (this.datalen === this.bufferlen && this.writepos >= this.readpos) {
        len = this.bufferlen;
    }
    // 缓存全部数据读空
    else if (this.writepos >= this.readpos) {
        len = this.writepos - this.readpos;
    }
    else {
        len = this.bufferlen - this.readpos + this.writepos;
    }
    if (len !== this.datalen) {
        new Error(`TcpBuffer getdatalen error, len:${len} datalen:${this.datalen}`);
    }
    return len;
};
TcpBuffer.prototype.getavailablelen = function () {
    return this.bufferlen - this.datalen;
};
TcpBuffer.prototype.expand = function (data) {
    let pushlen = data.length;
    let exlen = Math.ceil((this.datalen + pushlen) / 65536) * 65536;
    let tempbuffer = Buffer.alloc(exlen);
    this.bufferlen = exlen;
    // 数据存储进行了循环利用空间，需要进行重新打包
    // 数据存储在buffer的尾部+头部的顺序
    if (this.writepos < this.readpos) {
        let taillen = this.bufferlen - this.readpos;
        this.buffer.copy(tempbuffer, 0, this.readpos, this.readpos + taillen);
        this.buffer.copy(tempbuffer, taillen, 0, this.writepos);
    }
    else {
        // 数据是按照顺序进行的完整存储
        this.buffer.copy(tempbuffer, 0, this.readpos, this.writepos);
    }
    this.buffer = tempbuffer;
    tempbuffer = null;
    this.readpos = 0;
    this.writepos = this.datalen;
    data.copy(this.buffer, this.writepos, 0, pushlen);
    this.datalen += pushlen;
    this.writepos += pushlen;
};
TcpBuffer.prototype.pushbypiece = function (data) {
    /*   分两次存储到buffer：
     *   1、存储在原数据尾部
     *   2、存储在原数据头部
     */
    let pushlen = data.length;
    // buffer尾部剩余空间的长度
    let taillen = this.bufferlen - this.writepos;
    if (taillen < 0) {
        new Error('TcpBuffer pushbypiece error，buffer taillen < 0 ');
    }
    // 数据尾部位置
    data.copy(this.buffer, this.writepos, 0, taillen);
    this.writepos = 0;
    // data剩余未拷贝进缓存的长度
    let uncopylen = pushlen - taillen;
    data.copy(this.buffer, this.writepos, taillen, taillen + uncopylen);
    // 记录数据长度
    this.datalen += pushlen;
    // 记录buffer可写位置
    this.writepos += uncopylen;
};
TcpBuffer.prototype.push = function (data) {
    // 要拷贝数据的结束位置
    let pushlen = data.length;
    // 缓存剩余可用空间
    let availablelen = this.getavailablelen();
    // buffer剩余空间不足够存储本次数据
    if (availablelen < pushlen) {
        this.expand(data);
    }
    // 数据会冲破buffer尾部
    else if (this.writepos + pushlen > this.bufferlen) {
        this.pushbypiece(data);
    }
    // 剩余空间足够存储数据 
    else {
        // 拷贝数据到buffer
        data.copy(this.buffer, this.writepos, 0, pushlen);
        if (this.writepos > this.bufferlen) {
            new Error('TcpBuffer push erorr');
        }
        // 记录数据长度
        this.datalen += pushlen;
        // 记录buffer可写位置
        this.writepos += pushlen;
    }
};
TcpBuffer.prototype.pop = function (len) {
    if (this.getdatalen() < len) {
        return;
    }
    const canreadlen = this.bufferlen - this.readpos;
    let buffer = Buffer.alloc(len);
    // 数据包为分段存储，不能直接解析出
    if (canreadlen < len) {
        // 取出第一部分字节
        this.buffer.copy(buffer, 0, this.readpos, this.buffer.length);
        // 取出第二部分字节
        const secondlen = len - canreadlen;
        this.buffer.copy(buffer, canreadlen, 0, secondlen);
        this.readpos = secondlen;
    }
    else {
        this.buffer.copy(buffer, 0, this.readpos, this.readpos + len);
        this.readpos += len;
    }
    this.datalen -= len;
    return buffer;
};
module.exports = TcpBuffer;
