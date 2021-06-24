import * as net from "net";

let socket: net.Socket = net.connect({
    host: "127.0.0.1",
    port: 8107,
    localPort: 61235,

}, () => {

});

let success = false;
setInterval(() => {
    success = socket.write("0001000e00060000010203030201");
    if (success) {
        console.log("send success");
    }
}, 4000);

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