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
exports.BudgetLine = exports.Budget = exports.BudgetStatus = void 0;
const typeorm_1 = require("typeorm");
var BudgetStatus;
(function (BudgetStatus) {
    BudgetStatus["DRAFT"] = "draft";
    BudgetStatus["PENDING"] = "pending";
    BudgetStatus["APPROVED"] = "approved";
    BudgetStatus["REJECTED"] = "rejected";
})(BudgetStatus || (exports.BudgetStatus = BudgetStatus = {}));
let Budget = class Budget {
};
exports.Budget = Budget;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Budget.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Budget.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Budget.prototype, "fiscalYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Budget.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Budget.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BudgetStatus,
        default: BudgetStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Budget.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Budget.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Budget.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Budget.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Budget.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Budget.prototype, "updatedAt", void 0);
exports.Budget = Budget = __decorate([
    (0, typeorm_1.Entity)('budgets')
], Budget);
let BudgetLine = class BudgetLine {
};
exports.BudgetLine = BudgetLine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BudgetLine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BudgetLine.prototype, "budgetId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BudgetLine.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], BudgetLine.prototype, "plannedAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BudgetLine.prototype, "actualAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BudgetLine.prototype, "variance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BudgetLine.prototype, "notes", void 0);
exports.BudgetLine = BudgetLine = __decorate([
    (0, typeorm_1.Entity)('budget_lines')
], BudgetLine);
//# sourceMappingURL=budget.entity.js.map