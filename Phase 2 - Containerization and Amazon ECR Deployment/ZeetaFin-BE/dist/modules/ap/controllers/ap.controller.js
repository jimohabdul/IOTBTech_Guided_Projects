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
exports.APController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ap_service_1 = require("../services/ap.service");
const ap_dto_1 = require("../dto/ap.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
let APController = class APController {
    constructor(apService) {
        this.apService = apService;
    }
    findAllVendors() {
        return this.apService.findAllVendors();
    }
    findVendor(id) {
        return this.apService.findVendor(id);
    }
    createVendor(dto) {
        return this.apService.createVendor(dto);
    }
    findAllInvoices(status) {
        return this.apService.findAllInvoices(status);
    }
    findInvoice(id) {
        return this.apService.findInvoice(id);
    }
    createInvoice(dto) {
        return this.apService.createInvoice(dto);
    }
    approveInvoice(id, req) {
        return this.apService.approveInvoice(id, req.user.id);
    }
    createPayment(dto) {
        return this.apService.createPayment(dto);
    }
    getAgingReport() {
        return this.apService.getAgingReport();
    }
};
exports.APController = APController;
__decorate([
    (0, common_1.Get)('vendors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], APController.prototype, "findAllVendors", null);
__decorate([
    (0, common_1.Get)('vendors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], APController.prototype, "findVendor", null);
__decorate([
    (0, common_1.Post)('vendors'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AP_OFFICER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ap_dto_1.CreateVendorDto]),
    __metadata("design:returntype", void 0)
], APController.prototype, "createVendor", null);
__decorate([
    (0, common_1.Get)('invoices'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], APController.prototype, "findAllInvoices", null);
__decorate([
    (0, common_1.Get)('invoices/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], APController.prototype, "findInvoice", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AP_OFFICER, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ap_dto_1.CreateAPInvoiceDto]),
    __metadata("design:returntype", void 0)
], APController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Post)('invoices/:id/approve'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCIAL_CONTROLLER, user_role_enum_1.UserRole.FINANCE_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], APController.prototype, "approveInvoice", null);
__decorate([
    (0, common_1.Post)('payments'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.AP_OFFICER, user_role_enum_1.UserRole.TREASURY_OFFICER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ap_dto_1.CreateAPPaymentDto]),
    __metadata("design:returntype", void 0)
], APController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('aging'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], APController.prototype, "getAgingReport", null);
exports.APController = APController = __decorate([
    (0, swagger_1.ApiTags)('Accounts Payable'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('ap'),
    __metadata("design:paramtypes", [ap_service_1.APService])
], APController);
//# sourceMappingURL=ap.controller.js.map