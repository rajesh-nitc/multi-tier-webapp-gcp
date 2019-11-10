import { Request, Response } from "express";
import path = require("path");

export async function Vault(request: Request, response: Response) {

    const filePath = path.join(request.body.employeeId, request.body.vaultType, request.body.myyyy + ".PNG")
    try {
        response.sendFile(filePath, { root: "./vault-volume" })
    } catch (e) {
        console.log(e);
    }

}