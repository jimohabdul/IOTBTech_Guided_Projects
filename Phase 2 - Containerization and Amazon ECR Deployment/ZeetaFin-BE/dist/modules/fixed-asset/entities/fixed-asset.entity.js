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
exports.FixedAsset = exports.DepreciationMethod = exports.AssetStatus = void 0;
const typeorm_1 = require("typeorm");
var AssetStatus;
(function (AssetStatus) {
    AssetStatus["ACTIVE"] = "active";
    AssetStatus["DISPOSED"] = "disposed";
    AssetStatus["UNDER_MAINTENANCE"] = "under_maintenance";
})(AssetStatus || (exports.AssetStatus = AssetStatus = {}));
var DepreciationMethod;
(function (DepreciationMethod) {
    DepreciationMethod["STRAIGHT_LINE"] = "straight_line";
    DepreciationMethod["DECLINING_BALANCE"] = "declining_balance";
})(DepreciationMethod || (exports.DepreciationMethod = DepreciationMethod = {}));
let FixedAsset = class FixedAsset {
};
exports.FixedAsset = FixedAsset;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FixedAsset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FixedAsset.prototype, "assetCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FixedAsset.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FixedAsset.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FixedAsset.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], FixedAsset.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], FixedAsset.prototype, "purchaseCost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FixedAsset.prototype, "accumulatedDepreciation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], FixedAsset.prototype, "netBookValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FixedAsset.prototype, "usefulLifeYears", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DepreciationMethod,
        default: DepreciationMethod.STRAIGHT_LINE,
    }),
    __metadata("design:type", String)
], FixedAsset.prototype, "depreciationMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AssetStatus,
        default: AssetStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], FixedAsset.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], FixedAsset.prototype, "disposedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], FixedAsset.prototype, "disposalProceeds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FixedAsset.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FixedAsset.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FixedAsset.prototype, "updatedAt", void 0);
exports.FixedAsset = FixedAsset = __decorate([
    (0, typeorm_1.Entity)('fixed_assets')
], FixedAsset);
//# sourceMappingURL=fixed-asset.entity.js.map