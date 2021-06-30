import * as net from "net";

let socket: net.Socket = net.connect({
    host: "121.5.49.25",
    port: 3002,
    localPort: 61235,

}, () => {

});


let success = false;
//发送和接收数据是通过buffer
setInterval(() => {
    success = socket.write(Buffer.from("0001000e00060000010203030201"));
    if (success) {
        console.log("send success ");
    }
}, 4000);

socket.on('connect',()=>{
    console.log("scoket created");
});
socket.on('error', (err) => {
    console.log(err);
});

socket.on('data', (data) => {
    console.log(`receive data ${data}`);
})

process.on('beforeExit', (code: number) => {
    socket.end();
});

socket.on('timeout',()=>{
    console.log(`connect timeOut`);
})