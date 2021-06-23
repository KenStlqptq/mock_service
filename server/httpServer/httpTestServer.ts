import express from "express";
import * as uuid from "uuid";
import baseServer from "../baseServer";

// module server.httpServer {
//     const app = express();
//     const port = 3000;

//     let obj = {
//         errorCode: 0,
//         data: {
//             name: "test"
//         }
//     };

//     app.get('/test1', (req, res) => {
//         res.sendStatus(400);
//         res.send(obj);
//     });

//     app.get('/test2', (req, res) => {
//         res.send(obj);
//     });

//     app.get('/test3', (req, res) => {
//         res.send(obj);
//     });

//     app.listen(port, () => {
//         console.log(`HttpServer listening at http://localhost:${port}`);
//     });

//   export  class httpServer extends baseServer {
//         protected _beforeInit(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _init(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _checkStart(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _start(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _startFinish(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _ServerEnter(): boolean {
//             throw new Error("Method not implemented.");
//         }
//         protected _ServerLeave(): boolean {
//             throw new Error("Method not implemented.");
//         }

//     }
// }

const app = express();
const port = 3000;

let obj = {
    errorCode: 0,
    data: {
        name: "test",
        token: uuid.v4()
    }
};

app.get('/request1', (req, res) => {
    res.send({
        errorCode: 1,
        data: {
            description: "bad request"
        }
    });
    res.end();
});

app.get('/request2', (req, res) => {
    res.send(obj);
    res.end();
});

app.get('/request3', (req, res) => {
    res.send(obj);
    res.end();
});




app.listen(port, () => {
    console.log(`HttpServer listening at http://localhost:${port}`);
});