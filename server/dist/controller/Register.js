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
const typeorm_1 = require("typeorm");
const Employee_1 = require("../entity/Employee");
function Register(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeeRepository = typeorm_1.getManager().getRepository(Employee_1.Employee);
        const newemployee = employeeRepository.create(request.body);
        try {
            yield employeeRepository.save(newemployee);
            response.send(newemployee);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.Register = Register;
