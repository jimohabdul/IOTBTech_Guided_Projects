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
exports.AssetDisposalDto = exports.AssetTransferDto = exports.CreateFixedAssetDto = void 0;
const class_validator_1 = require("class-validator");
const fixed_asset_entity_1 = require("../entities/fixed-asset.entity");
class CreateFixedAssetDto {
}
exports.CreateFixedAssetDto = CreateFixedAssetDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "assetCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFixedAssetDto.prototype, "purchaseCost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFixedAssetDto.prototype, "usefulLifeYears", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(fixed_asset_entity_1.DepreciationMethod),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "depreciationMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFixedAssetDto.prototype, "notes", void 0);
class AssetTransferDto {
}
exports.AssetTransferDto = AssetTransferDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssetTransferDto.prototype, "location", void 0);
class AssetDisposalDto {
}
exports.AssetDisposalDto = AssetDisposalDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], AssetDisposalDto.prototype, "disposedAt", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AssetDisposalDto.prototype, "disposalProceeds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssetDisposalDto.prototype, "notes", void 0);
//# sourceMappingURL=fixed-asset.dto.js.map