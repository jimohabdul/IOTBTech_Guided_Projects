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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashManagementController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cash_management_service_1 = require("../services/cash-management.service");
const cash_management_dto_1 = require("../dto/cash-management.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
let CashManagementController = class CashManagementController {
    constructor(cashService) {
        this.cashService = cashService;
    }
    findAllAccounts() {
        return this.cashService.findAllBankAccounts();
    }
    findAccount(id) {
        return this.cashService.findBankAccount(id);
    }
    createAccount(dto) {
        return this.cashService.createBankAccount(dto);
    }
    getCashPosition() {
        return this.cashService.getCashPosition();
    }
    recordTransaction(dto) {
        return this.cashService.recordTransaction(dto);
    }
    getTransactions(accountId) {
        return this.cashService.getTransactions(accountId);
    }
    reconcile(dto) {
        return this.cashService.reconcile(dto);
    }
};
exports.CashManagementController = CashManagementController;
__decorate([
    (0, common_1.Get)('accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "findAllAccounts", null);
__decorate([
    (0, common_1.Get)('accounts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "findAccount", null);
__decorate([
    (0, common_1.Post)('accounts'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.TREASURY_OFFICER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cash_management_dto_1.CreateBankAccountDto]),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)('position'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "getCashPosition", null);
__decorate([
    (0, common_1.Post)('transactions'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.TREASURY_OFFICER, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cash_management_dto_1.CreateCashTransactionDto]),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "recordTransaction", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __param(0, (0, common_1.Query)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Post)('reconciliation'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.TREASURY_OFFICER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cash_management_dto_1.CreateReconciliationDto]),
    __metadata("design:returntype", void 0)
], CashManagementController.prototype, "reconcile", null);
exports.CashManagementController = CashManagementController = __decorate([
    (0, swagger_1.ApiTags)('Cash Management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('cash'),
    __metadata("design:paramtypes", [cash_management_service_1.CashManagementService])
], CashManagementController);
//# sourceMappingURL=cash-management.controller.js.map