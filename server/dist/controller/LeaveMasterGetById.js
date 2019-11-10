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
const LeaveMaster_1 = require("../entity/LeaveMaster");
function LeaveMasterGetById(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const leaveMasterRepository = typeorm_1.getManager().getRepository(LeaveMaster_1.LeaveMaster);
        const leaveMaster = yield leaveMasterRepository.findOne({ where: { id: request.body.employeeId } });
        // console.log('leave from db', leaveMaster);
        if (leaveMaster) {
            response.send(leaveMaster);
        }
        else {
            response.send({ message: "leave master not found" });
        }
    });
}
exports.LeaveMasterGetById = LeaveMasterGetById;
