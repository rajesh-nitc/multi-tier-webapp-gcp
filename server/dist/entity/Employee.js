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
const LeaveMaster_1 = require("./LeaveMaster");
const LeaveTransaction_1 = require("./LeaveTransaction");
let Employee = class Employee {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "emailId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Employee.prototype, "grade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Employee.prototype, "joinedOn", void 0);
__decorate([
    typeorm_1.OneToOne((type) => LeaveMaster_1.LeaveMaster, (lea) => lea.employee, { eager: true }),
    __metadata("design:type", LeaveMaster_1.LeaveMaster)
], Employee.prototype, "leaveMaster", void 0);
__decorate([
    typeorm_1.OneToMany((type) => LeaveTransaction_1.LeaveTransaction, (txn) => txn.employee, { eager: true }),
    __metadata("design:type", Array)
], Employee.prototype, "txns", void 0);
Employee = __decorate([
    typeorm_1.Entity()
], Employee);
exports.Employee = Employee;
