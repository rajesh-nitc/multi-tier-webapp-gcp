import * as bodyParser from "body-parser";
import cors = require("cors");
import * as dotenv from "dotenv"
import { Request, Response } from "express";
import * as express from "express";
import jwt = require("express-jwt");
import morgan = require("morgan");
import os = require("os");
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Login } from "./controller/Login";
import { Register } from "./controller/Register";
import { CronUtil } from "./cron";
import { AppRoutes } from "./routes";
import { SocketUtil } from "./socket";
if (process.env.ENV !== "production") {
    dotenv.config();
}
createConnection(
    {
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: "root",
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + "/entity/**/*.js"],
        synchronize: true,
        logging: false,
    },
).then(async (connection) => {
    const app = express();
    const server = require("http").createServer(app);
    const io = require("socket.io")(server, { origins: "*:*" });
    // new SocketUtil().socketConnection(io)
    new CronUtil().incrementLeaves();

    app.use(cors({ origin: true, credentials: true }));
    app.use(morgan("short"));
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.post("/api/login", Login);
    app.post("/api/register", Register);
    app.get("/", (req: Request, res: Response, next: any) => {
        try {
            res.send(`hostname: ${os.hostname()}`);
        } catch (e) {
            next(e);
        }
    });

    app.use(jwt({ secret: "secret" }));

    AppRoutes.forEach((route) => {
        app[route.method](route.path, (request: Request, response: Response, next: any) => {
            route.action(request, response)
                .then(() => next)
                .catch((err) => next(err));
        });
    });

    server.listen(process.env.PORT);
    console.log(`server up at ${process.env.PORT}`);

}).catch((error) => console.log("connection error: ", error));
