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
exports.GLController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chart_of_accounts_service_1 = require("../services/chart-of-accounts.service");
const journal_entries_service_1 = require("../services/journal-entries.service");
const chart_of_account_dto_1 = require("../dto/chart-of-account.dto");
const journal_entry_dto_1 = require("../dto/journal-entry.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
let GLController = class GLController {
    constructor(accountsService, journalService) {
        this.accountsService = accountsService;
        this.journalService = journalService;
    }
    findAllAccounts() {
        return this.accountsService.findAll();
    }
    findOneAccount(id) {
        return this.accountsService.findOne(id);
    }
    createAccount(dto) {
        return this.accountsService.create(dto);
    }
    updateAccount(id, dto) {
        return this.accountsService.update(id, dto);
    }
    findAllJournals(status) {
        return this.journalService.findAll(status);
    }
    findOneJournal(id) {
        return this.journalService.findOne(id);
    }
    createJournal(dto, req) {
        return this.journalService.create(dto, req.user.id);
    }
    approveJournal(id, req) {
        return this.journalService.approve(id, req.user.id);
    }
    postJournal(id) {
        return this.journalService.post(id);
    }
    getTrialBalance() {
        return this.accountsService.getTrialBalance();
    }
    getBalanceSheet() {
        return this.accountsService.getBalanceSheet();
    }
    getProfitAndLoss(from, to) {
        return this.accountsService.getProfitAndLoss(from, to);
    }
};
exports.GLController = GLController;
__decorate([
    (0, common_1.Get)('chart-of-accounts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GLController.prototype, "findAllAccounts", null);
__decorate([
    (0, common_1.Get)('chart-of-accounts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "findOneAccount", null);
__decorate([
    (0, common_1.Post)('chart-of-accounts'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chart_of_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Post)('chart-of-accounts/:id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chart_of_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Get)('journal-entries'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "findAllJournals", null);
__decorate([
    (0, common_1.Get)('journal-entries/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "findOneJournal", null);
__decorate([
    (0, common_1.Post)('journal-entries'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journal_entry_dto_1.CreateJournalEntryDto, Object]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "createJournal", null);
__decorate([
    (0, common_1.Post)('journal-entries/:id/approve'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCIAL_CONTROLLER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "approveJournal", null);
__decorate([
    (0, common_1.Post)('journal-entries/:id/post'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "postJournal", null);
__decorate([
    (0, common_1.Get)('trial-balance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GLController.prototype, "getTrialBalance", null);
__decorate([
    (0, common_1.Get)('balance-sheet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GLController.prototype, "getBalanceSheet", null);
__decorate([
    (0, common_1.Get)('profit-and-loss'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GLController.prototype, "getProfitAndLoss", null);
exports.GLController = GLController = __decorate([
    (0, swagger_1.ApiTags)('General Ledger'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('gl'),
    __metadata("design:paramtypes", [chart_of_accounts_service_1.ChartOfAccountsService,
        journal_entries_service_1.JournalEntriesService])
], GLController);
//# sourceMappingURL=gl.controller.js.map