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
exports.FixedAssetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fixed_asset_service_1 = require("../services/fixed-asset.service");
const fixed_asset_dto_1 = require("../dto/fixed-asset.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../../common/enums/user-role.enum");
let FixedAssetController = class FixedAssetController {
    constructor(assetService) {
        this.assetService = assetService;
    }
    findAll() {
        return this.assetService.findAll();
    }
    findOne(id) {
        return this.assetService.findOne(id);
    }
    create(dto) {
        return this.assetService.create(dto);
    }
    transfer(id, dto) {
        return this.assetService.transfer(id, dto);
    }
    dispose(id, dto) {
        return this.assetService.dispose(id, dto);
    }
    depreciate(id) {
        return this.assetService.calculateDepreciation(id);
    }
    getRegister() {
        return this.assetService.getAssetRegister();
    }
    getDepreciationSchedule() {
        return this.assetService.getDepreciationSchedule();
    }
};
exports.FixedAssetController = FixedAssetController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fixed_asset_dto_1.CreateFixedAssetDto]),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/transfer'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fixed_asset_dto_1.AssetTransferDto]),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "transfer", null);
__decorate([
    (0, common_1.Post)(':id/dispose'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.FINANCIAL_CONTROLLER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fixed_asset_dto_1.AssetDisposalDto]),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "dispose", null);
__decorate([
    (0, common_1.Post)(':id/depreciate'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_ADMIN, user_role_enum_1.UserRole.ACCOUNTANT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "depreciate", null);
__decorate([
    (0, common_1.Get)('reports/register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "getRegister", null);
__decorate([
    (0, common_1.Get)('reports/depreciation-schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FixedAssetController.prototype, "getDepreciationSchedule", null);
exports.FixedAssetController = FixedAssetController = __decorate([
    (0, swagger_1.ApiTags)('Fixed Assets'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('fixed-assets'),
    __metadata("design:paramtypes", [fixed_asset_service_1.FixedAssetService])
], FixedAssetController);
//# sourceMappingURL=fixed-asset.controller.js.map