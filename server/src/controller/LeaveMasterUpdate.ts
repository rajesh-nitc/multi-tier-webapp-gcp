import { Request, Response } from "express";
import { getManager } from "typeorm";
import { LeaveMaster } from "../entity/LeaveMaster";

export async function LeaveMasterUpdate(request: Request, response: Response) {

    const leaveMasterRepository = getManager().getRepository(LeaveMaster);

    if (request.body.category === "casual") {
        await leaveMasterRepository.update(request.body.employeeId, { casual: request.body.newBalance });
        response.send(await leaveMasterRepository.findOne({ where: { id: request.body.employeeId } }));

    } else if (request.body.category === "earned") {
        await leaveMasterRepository.update(request.body.employeeId, { earned: request.body.newBalance });
        response.send(await leaveMasterRepository.findOne({ where: { id: request.body.employeeId } }));

    } else {
        await leaveMasterRepository.update(request.body.employeeId, { sick: request.body.newBalance });
        response.send(await leaveMasterRepository.findOne({ where: { id: request.body.employeeId } }));

    }

}
