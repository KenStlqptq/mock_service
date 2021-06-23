import dgram from 'dgram';
let udp_client = dgram.createSocket('udp4'); 

udp_client.on('close',function(){
    console.log('udp client closed.')
})

udp_client.on('error', function () {
    console.log('some error on udp client.')
})

udp_client.on('message', function (msg,rinfo) {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
})

setInterval(function(){
    var SendBuff = 'hello 123.';
    var SendLen = SendBuff.length;
    udp_client.send(SendBuff, 0, SendLen, 5678, '127.0.0.1'); 
},3000);