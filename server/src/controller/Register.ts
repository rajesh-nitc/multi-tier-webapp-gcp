import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Employee } from "../entity/Employee";

export async function Register(request: Request, response: Response, next:any) {

    const employeeRepository = getManager().getRepository(Employee);
    const newemployee = employeeRepository.create(request.body);

    try {
        await employeeRepository.save(newemployee);
        response.send(newemployee);
    } catch (e) {
        next(e);
    }

}
