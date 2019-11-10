import { Request, Response } from "express";
import { getManager } from "typeorm";
import { LeaveMaster } from "../entity/LeaveMaster";

export async function LeaveMasterSave(request: Request, response: Response) {

    const leaveBalRepository = getManager().getRepository(LeaveMaster);
    const newLeaveBal = leaveBalRepository.create(request.body);
    await leaveBalRepository.save(newLeaveBal);
    response.send(newLeaveBal);


}
