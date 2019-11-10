import { LeaveMasterGetById } from "./controller/LeaveMasterGetById";
import { LeaveMasterSave } from "./controller/LeaveMasterSave";
import { LeaveMasterUpdate } from "./controller/LeaveMasterUpdate";
import { LeaveTransactionSave } from "./controller/LeaveTransactionSave";
import { Vault } from "./controller/Vault";

export const AppRoutes = [

    {
        path: "/api/getleavemasterbyid",
        method: "post",
        action: LeaveMasterGetById,
    },
    {
        path: "/api/saveleavemaster",
        method: "post",
        action: LeaveMasterSave,
    },
    {
        path: "/api/saveleavetxn",
        method: "post",
        action: LeaveTransactionSave,
    },
    {
        path: "/api/updateleavemaster",
        method: "post",
        action: LeaveMasterUpdate,
    },
    {
        path: "/api/getvault",
        method: "post",
        action: Vault,
    }

];
