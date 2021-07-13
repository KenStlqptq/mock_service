// import httpServer from './server/httpServer/httpTestServer';
// import tcpServer from './server/tcpServer/tcpTestServer';
// import udpServer from './server/udpServer/udpTestServer';


import * as child_process from 'child_process';


function main() {
    child_process.exec("node ./bin/server/httpServer/httpTestServer.js", {

    },
    (err: child_process.ExecException | null, stdout: string, stderr: string) => {
        console.log(stdout);
    });
    // child_process.exec("node ./bin/server/tcpServer/tcpTestServer.js");
    // child_process.exec("node ./bin/server/udpServer/udpTestServer.js");
}
main();