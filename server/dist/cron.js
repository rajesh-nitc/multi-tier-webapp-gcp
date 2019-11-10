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
const CronJob = require("cron").CronJob;
const typeorm_1 = require("typeorm");
const LeaveMaster_1 = require("./entity/LeaveMaster");
class CronUtil {
    incrementLeaves() {
        return __awaiter(this, void 0, void 0, function* () {
            const job = new CronJob('0 0 20 12 * *', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("This is new Date()", new Date());
                    yield typeorm_1.getConnection()
                        .createQueryBuilder()
                        .update(LeaveMaster_1.LeaveMaster)
                        .set({ casual: () => "casual + 2", earned: () => "earned + 1", sick: () => "sick + 2" })
                        .where("employeeId = :employeeId", { employeeId: 1 })
                        .execute();
                });
            }, null, true, "Asia/Kolkata");
            job.start();
        });
    }
}
exports.CronUtil = CronUtil;
