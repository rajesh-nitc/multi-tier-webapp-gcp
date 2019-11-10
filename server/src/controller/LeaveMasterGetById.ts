import { Request, Response } from "express";
import { getManager } from "typeorm";
import { LeaveMaster } from "../entity/LeaveMaster";

export async function LeaveMasterGetById(request: Request, response: Response) {

    const leaveMasterRepository = getManager().getRepository(LeaveMaster);
    const leaveMaster: any = await leaveMasterRepository.findOne({ where: { id: request.body.employeeId } });
    // console.log('leave from db', leaveMaster);
    if (leaveMaster) {
        response.send(leaveMaster);
    } else {
        response.send({ message: "leave master not found" });
    }

}
