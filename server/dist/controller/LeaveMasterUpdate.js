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
function LeaveMasterUpdate(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const leaveMasterRepository = typeorm_1.getManager().getRepository(LeaveMaster_1.LeaveMaster);
        if (request.body.category === "casual") {
            yield leaveMasterRepository.update(request.body.employeeId, { casual: request.body.newBalance });
            response.send(yield leaveMasterRepository.findOne({ where: { id: request.body.employeeId } }));
        }
        else if (request.body.category === "earned") {
            yield leaveMasterRepository.update(request.body.employeeId, { earned: request.body.newBalance });
            response.send(yield leaveMasterRepository.findOne({ where: { id: request.body.employeeId } }));
        }
        else {
            yield leaveMasterRepository.update(request.body.employeeId, { sick: request.body.newBalance });
            response.send(yield leaveMasterRepository.findOne({ where: { id: request.body.employeeId } }));
        }
    });
}
exports.LeaveMasterUpdate = LeaveMasterUpdate;
