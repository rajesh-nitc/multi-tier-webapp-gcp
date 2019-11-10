import { Request, Response } from "express";
import jwt = require("jsonwebtoken");
import { getManager, getRepository } from "typeorm";
import { Employee } from "../entity/Employee";

export async function Login(request: Request, response: Response, next:any) {

    const token = jwt.sign({
        emailId: request.body.emailId,
    }, "secret", { expiresIn: "15m" });

    const employeeRepository = getManager().getRepository(Employee);

    try {
        const employee: any = await employeeRepository.findOne({ where: { emailId: request.body.emailId, password: request.body.password } });
        // console.log('employee from db', employee);
        if (employee) {
            response.send({ token: token, employeeId: employee.id });
        } else {
            response.send({ message: "Invalid credentials" });
        }

    } catch (e) {
        next(e);

    }

}
