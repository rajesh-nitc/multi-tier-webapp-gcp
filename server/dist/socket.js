"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketUtil {
    constructor() {
        this.timerId = null;
        this.sockets = new Set();
    }
    socketConnection(io) {
        io.on("connection", (socket) => {
            this.sockets.add(socket);
            console.log(`New socket added with id: ${socket.id}`);
            console.log("Total sockets connected: ", this.sockets.size);
            if (!this.timerId) {
                this.startTimer();
            }
            socket.on("clientdata", (data) => console.log("Received data from client", data));
            socket.on("disconnect", () => {
                console.log(`Deleting Socket: ${socket.id}`);
                this.sockets.delete(socket);
                console.log(`Remaining sockets: ${this.sockets.size}`);
            });
        });
    }
    startTimer() {
        this.timerId = setInterval(() => {
            if (!this.sockets.size) {
                clearInterval(this.timerId);
                this.timerId = null;
                console.log("Timer stopped");
            }
            let value = Math.random().toFixed(2);
            for (const s of this.sockets) {
                console.log(`Emitting value: ${value}`);
                s.emit("data", { data: value });
            }
        }, 2000);
    }
}
exports.SocketUtil = SocketUtil;
