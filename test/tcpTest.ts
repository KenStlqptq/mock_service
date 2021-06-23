import * as net from "net";

let socket: net.Socket = net.connect({
    host: "127.0.0.1",
    port: 8107,
    localPort: 61235,

}, () => {

});

let success = socket.write("test\r\n");

if (success) {
    console.log("send success");
}

setInterval(() => {
    socket.write("test3");
}, 1000);



//socket.end();

socket.on('error', (err) => {
    console.log(err);
});
socket.on('data',(data)=>{
    console.log(`receive data ${data}`);
})



process.on('beforeExit', (code: number) => {
    socket.end();
});
