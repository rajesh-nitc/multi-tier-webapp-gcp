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
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const Employee_1 = require("../entity/Employee");
function Login(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign({
            emailId: request.body.emailId,
        }, "secret", { expiresIn: "15m" });
        const employeeRepository = typeorm_1.getManager().getRepository(Employee_1.Employee);
        try {
            const employee = yield employeeRepository.findOne({ where: { emailId: request.body.emailId, password: request.body.password } });
            // console.log('employee from db', employee);
            if (employee) {
                response.send({ token: token, employeeId: employee.id });
            }
            else {
                response.send({ message: "Invalid credentials" });
            }
        }
        catch (e) {
            next(e);
        }
    });
}
exports.Login = Login;
