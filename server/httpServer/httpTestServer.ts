import express from "express";
import * as uuid from "uuid";
import baseServer from "../baseServer";
import * as http from "http";

const app = express();
const port = 3000;

let httpServer = http.createServer(app);
app.setMaxListeners(100);

app.get('/errorRequest', (req, res) => {
    res.send({
        errorCode: 100,
        data: {
            description: "bad request"
        }
    });
    res.end();
});

app.get('/normalRequest', (req, res) => {
    res.send({
        errorCode: 0,
        data: {
            name: "test",
            time:Date.now(),
            token: uuid.v4()
        }
    });
    res.end();
});

app.get('/timeoutRequest', (req, res) => {
});

app.get('/test', (req, res) => {
    res.send({
        errorCode: 0,
        data: {
            name: "test2"
        }
    });
    res.end();
});

httpServer.listen(port);