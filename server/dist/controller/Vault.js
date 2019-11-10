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
const path = require("path");
function Vault(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path.join(request.body.employeeId, request.body.vaultType, request.body.myyyy + ".PNG");
        try {
            response.sendFile(filePath, { root: "./vault-volume" });
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.Vault = Vault;
