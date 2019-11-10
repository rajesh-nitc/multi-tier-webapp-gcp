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
var Category;
(function (Category) {
    Category["CASUAL"] = "casual";
    Category["EARNED"] = "earned";
    Category["SICK"] = "sick";
})(Category = exports.Category || (exports.Category = {}));
let LeaveTransaction = class LeaveTransaction {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LeaveTransaction.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LeaveTransaction.prototype, "txnOn", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LeaveTransaction.prototype, "from", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LeaveTransaction.prototype, "to", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: Category,
    }),
    __metadata("design:type", String)
], LeaveTransaction.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => Employee_1.Employee, (emp) => emp.txns),
    __metadata("design:type", Employee_1.Employee)
], LeaveTransaction.prototype, "employee", void 0);
LeaveTransaction = __decorate([
    typeorm_1.Entity()
], LeaveTransaction);
exports.LeaveTransaction = LeaveTransaction;
