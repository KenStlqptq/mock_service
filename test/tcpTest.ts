import * as net from "net";

let socket: net.Socket = net.connect({
    host:"127.0.0.1",
    port: 8107,
    localPort:61234,
    
}, () => {

});

let success = socket.write("test\r\n");

if (success) {
    console.log("send success");
}
socket.write("test2");
socket.end();

socket.on('error',(err)=>{
console.log(err);
});




process.on('beforeExit',(code:number)=>{
    socket.end();
});
