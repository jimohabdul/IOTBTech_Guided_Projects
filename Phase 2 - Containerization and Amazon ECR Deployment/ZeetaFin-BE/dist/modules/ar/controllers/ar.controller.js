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
exports.ARController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ar_service_1 = require("../services/ar.service");
const ar_dto_1 = require("../dto/ar.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
let ARController = class ARController {
    constructor(arService) {
        this.arService = arService;
    }
    findAllCustomers() {
        return this.arService.findAllCustomers();
    }
    findCustomer(id) {
        return this.arService.findCustomer(id);
    }
    createCustomer(dto) {
        return this.arService.createCustomer(dto);
    }
    findAllInvoices(status) {
        return this.arService.findAllInvoices(status);
    }
    findInvoice(id) {
        return this.arService.findInvoice(id);
    }
    createInvoice(dto) {
        return this.arService.createInvoice(dto);
    }
    createReceipt(dto) {
        return this.arService.createReceipt(dto);
    }
    createCreditNote(dto) {
        return this.arService.createCreditNote(dto);
    }
    getAgingReport() {
        return this.arService.getAgingReport();
    }
};
exports.ARController = ARController;
__decorate([
    (0, common_1.Get)('customers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ARController.prototype, "findAllCustomers", null);
__decorate([
    (0, common_1.Get)('customers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "findCustomer", null);
__decorate([
    (0, common_1.Post)('customers'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AR_OFFICER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ar_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('invoices'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "findAllInvoices", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "findInvoice", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AR_OFFICER, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ar_dto_1.CreateARInvoiceDto]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Post)('receipts'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AR_OFFICER, user_role_enum_1.UserRole.TREASURY_OFFICER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ar_dto_1.CreateReceiptDto]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "createReceipt", null);
__decorate([
    (0, common_1.Post)('credit-notes'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AR_OFFICER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ar_dto_1.CreateCreditNoteDto]),
    __metadata("design:returntype", void 0)
], ARController.prototype, "createCreditNote", null);
__decorate([
    (0, common_1.Get)('aging'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ARController.prototype, "getAgingReport", null);
exports.ARController = ARController = __decorate([
    (0, swagger_1.ApiTags)('Accounts Receivable'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('ar'),
    __metadata("design:paramtypes", [ar_service_1.ARService])
], ARController);
//# sourceMappingURL=ar.controller.js.map