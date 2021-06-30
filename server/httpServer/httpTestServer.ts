import express from "express";
import * as uuid from "uuid";
import baseServer from "../baseServer";
import * as http from "http";
import Chance from "chance";

const app = express();
const port = 3001;
const chance = new Chance();
const errorCode1 = [402, 401, 500];
const errorCode2 = [0x111, 0x112, 0x113];

let httpServer = http.createServer(app);
app.setMaxListeners(100);

app.get('/errorRequest', (req, res) => {
    console.log(`Get Request From ${req.ip}`);
    res.send({
        errorCode: 100,
        data: {
            description: "bad request"
        }
    });
    res.end();
});

app.get('/random', (req, res) => {
    console.log(`Get Request From ${req.ip}`);
    const rand = chance.integer({ min: 0, max: 100 });
    if (rand < 80) {
        let respTime = 0;
        if (rand < 10) {
            respTime = 200;
        }
        else if (rand < 20) {
            respTime = 600;
        }
        setTimeout(() => {
            res.send({
                errorCode: 0,
                data: {
                    name: "test",
                    time: Date.now(),
                    token: uuid.v4()
                }
            });
            res.end();
        }, respTime)
    }
    else if (rand < 85) {
        res.send({
            errorCode: chance.pickone(errorCode2)
        });
        res.end();
    }
    else if (rand < 95) {
        res.send(chance.pickone(errorCode1));
        res.end();
    }
});

app.get('/normalRequest', (req, res) => {
    console.log(`Get Request From ${req.ip}`);
    res.send({
        errorCode: 0,
        data: {
            name: "test",
            time: Date.now(),
            token: uuid.v4()
        }
    });
    res.end();
});

app.get('/timeoutRequest', (req, res) => {
});

app.get('/test', (req, res) => {
    console.log(`Get Request From ${req.ip}`);
    res.send({
        errorCode: 0,
        data: {
            name: "test2"
        }
    });
    res.end();
});

console.log(`HttpServer Start On ${port}`);
httpServer.listen(port);