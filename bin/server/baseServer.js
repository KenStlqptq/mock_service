"use strict";
var server;
(function (server) {
    let serverStatus;
    (function (serverStatus) {
        serverStatus[serverStatus["stop"] = 0] = "stop";
        serverStatus[serverStatus["fail"] = 1] = "fail";
        serverStatus[serverStatus["running"] = 2] = "running";
    })(serverStatus = server.serverStatus || (server.serverStatus = {}));
    ;
    class CBaseServer {
        constructor() { }
    }
    server.CBaseServer = CBaseServer;
})(server || (server = {}));
module.exports = server.CBaseServer;
