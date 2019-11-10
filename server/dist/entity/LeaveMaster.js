"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Employee_1 = require("./Employee");
let LeaveMaster = class LeaveMaster {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LeaveMaster.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LeaveMaster.prototype, "earned", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LeaveMaster.prototype, "casual", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LeaveMaster.prototype, "sick", void 0);
__decorate([
    typeorm_1.OneToOne((type) => Employee_1.Employee, (emp) => emp.leaveMaster),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Employee_1.Employee)
], LeaveMaster.prototype, "employee", void 0);
LeaveMaster = __decorate([
    typeorm_1.Entity()
], LeaveMaster);
exports.LeaveMaster = LeaveMaster;
