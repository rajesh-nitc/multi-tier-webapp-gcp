const CronJob = require("cron").CronJob;
import { getConnection } from "typeorm";
import { LeaveMaster } from "./entity/LeaveMaster";

export class CronUtil {

    public async incrementLeaves() {
        const job = new CronJob('0 0 20 12 * *', async function() {
            console.log("This is new Date()", new Date());
            await getConnection()
                .createQueryBuilder()
                .update(LeaveMaster)
                .set({ casual: () => "casual + 2", earned: () => "earned + 1", sick: () => "sick + 2" })
                .where("employeeId = :employeeId", { employeeId: 1 })
                .execute();

        }, null, true, "Asia/Kolkata");

        job.start();
    }

}
