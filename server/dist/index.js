"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const jwt = require("express-jwt");
const morgan = require("morgan");
const os = require("os");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Login_1 = require("./controller/Login");
const Register_1 = require("./controller/Register");
const cron_1 = require("./cron");
const routes_1 = require("./routes");
if (process.env.ENV !== "production") {
    dotenv.config();
}
typeorm_1.createConnection({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [__dirname + "/entity/**/*.js"],
    synchronize: true,
    logging: false,
}).then((connection) => __awaiter(this, void 0, void 0, function* () {
    const app = express();
    const server = require("http").createServer(app);
    const io = require("socket.io")(server, { origins: "*:*" });
    // new SocketUtil().socketConnection(io)
    new cron_1.CronUtil().incrementLeaves();
    app.use(cors({ origin: true, credentials: true }));
    app.use(morgan("short"));
    app.use(express.static("public"));
    app.use(bodyParser.json());
    app.post("/api/login", Login_1.Login);
    app.post("/api/register", Register_1.Register);
    app.get("/", (req, res, next) => {
        try {
            res.send(`hostname: ${os.hostname()}`);
        }
        catch (e) {
            next(e);
        }
    });
    app.use(jwt({ secret: "secret" }));
    routes_1.AppRoutes.forEach((route) => {
        app[route.method](route.path, (request, response, next) => {
            route.action(request, response)
                .then(() => next)
                .catch((err) => next(err));
        });
    });
    server.listen(process.env.PORT);
    // server.listen(3002);
    console.log(`server up at ${process.env.PORT}`);
})).catch((error) => console.log("connection error: ", error));
