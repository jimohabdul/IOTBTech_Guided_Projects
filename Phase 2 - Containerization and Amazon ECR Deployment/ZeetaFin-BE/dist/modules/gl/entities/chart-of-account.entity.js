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
exports.ChartOfAccount = exports.AccountSubType = exports.AccountType = void 0;
const typeorm_1 = require("typeorm");
var AccountType;
(function (AccountType) {
    AccountType["ASSET"] = "asset";
    AccountType["LIABILITY"] = "liability";
    AccountType["EQUITY"] = "equity";
    AccountType["REVENUE"] = "revenue";
    AccountType["EXPENSE"] = "expense";
})(AccountType || (exports.AccountType = AccountType = {}));
var AccountSubType;
(function (AccountSubType) {
    AccountSubType["CURRENT_ASSET"] = "current_asset";
    AccountSubType["NON_CURRENT_ASSET"] = "non_current_asset";
    AccountSubType["CURRENT_LIABILITY"] = "current_liability";
    AccountSubType["NON_CURRENT_LIABILITY"] = "non_current_liability";
    AccountSubType["SHAREHOLDERS_EQUITY"] = "shareholders_equity";
    AccountSubType["OPERATING_REVENUE"] = "operating_revenue";
    AccountSubType["OPERATING_EXPENSE"] = "operating_expense";
    AccountSubType["OTHER_INCOME"] = "other_income";
    AccountSubType["OTHER_EXPENSE"] = "other_expense";
})(AccountSubType || (exports.AccountSubType = AccountSubType = {}));
let ChartOfAccount = class ChartOfAccount {
};
exports.ChartOfAccount = ChartOfAccount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AccountType }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AccountSubType, nullable: true }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "subType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ChartOfAccount.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ChartOfAccount.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ChartOfAccount.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ChartOfAccount.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ChartOfAccount.prototype, "updatedAt", void 0);
exports.ChartOfAccount = ChartOfAccount = __decorate([
    (0, typeorm_1.Entity)('chart_of_accounts')
], ChartOfAccount);
//# sourceMappingURL=chart-of-account.entity.js.map