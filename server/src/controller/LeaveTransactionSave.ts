import { Request, Response } from "express";
import { getManager } from "typeorm";
import { LeaveTransaction } from "../entity/LeaveTransaction";

export async function LeaveTransactionSave(request: Request, response: Response) {

    const leaveTxnRepository = getManager().getRepository(LeaveTransaction);
    const newLeaveTxn = leaveTxnRepository.create(request.body);
    await leaveTxnRepository.save(newLeaveTxn);
    response.send(newLeaveTxn);

}
