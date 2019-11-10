"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeaveMasterGetById_1 = require("./controller/LeaveMasterGetById");
const LeaveMasterSave_1 = require("./controller/LeaveMasterSave");
const LeaveMasterUpdate_1 = require("./controller/LeaveMasterUpdate");
const LeaveTransactionSave_1 = require("./controller/LeaveTransactionSave");
const Vault_1 = require("./controller/Vault");
exports.AppRoutes = [
    {
        path: "/api/getleavemasterbyid",
        method: "post",
        action: LeaveMasterGetById_1.LeaveMasterGetById,
    },
    {
        path: "/api/saveleavemaster",
        method: "post",
        action: LeaveMasterSave_1.LeaveMasterSave,
    },
    {
        path: "/api/saveleavetxn",
        method: "post",
        action: LeaveTransactionSave_1.LeaveTransactionSave,
    },
    {
        path: "/api/updateleavemaster",
        method: "post",
        action: LeaveMasterUpdate_1.LeaveMasterUpdate,
    },
    {
        path: "/api/getvault",
        method: "post",
        action: Vault_1.Vault,
    }
];
