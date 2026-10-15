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
exports.FixedAssetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fixed_asset_entity_1 = require("../entities/fixed-asset.entity");
let FixedAssetService = class FixedAssetService {
    constructor(assetRepository) {
        this.assetRepository = assetRepository;
    }
    async findAll() {
        return this.assetRepository.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const asset = await this.assetRepository.findOne({ where: { id } });
        if (!asset)
            throw new common_1.NotFoundException('Asset not found');
        return asset;
    }
    async create(dto) {
        const asset = this.assetRepository.create({
            ...dto,
            purchaseDate: dto.purchaseDate,
            accumulatedDepreciation: 0,
            netBookValue: dto.purchaseCost,
        });
        return this.assetRepository.save(asset);
    }
    async transfer(id, dto) {
        const asset = await this.findOne(id);
        asset.location = dto.location;
        return this.assetRepository.save(asset);
    }
    async dispose(id, dto) {
        const asset = await this.findOne(id);
        if (asset.status === fixed_asset_entity_1.AssetStatus.DISPOSED) {
            throw new common_1.BadRequestException('Asset is already disposed');
        }
        asset.status = fixed_asset_entity_1.AssetStatus.DISPOSED;
        asset.disposedAt = dto.disposedAt;
        asset.disposalProceeds = dto.disposalProceeds;
        asset.notes = dto.notes || asset.notes;
        return this.assetRepository.save(asset);
    }
    async calculateDepreciation(id) {
        const asset = await this.findOne(id);
        if (asset.status !== fixed_asset_entity_1.AssetStatus.ACTIVE) {
            throw new common_1.BadRequestException('Only active assets can be depreciated');
        }
        if (!asset.usefulLifeYears || asset.usefulLifeYears <= 0) {
            throw new common_1.BadRequestException('Asset must have a useful life');
        }
        let annualDepreciation;
        if (asset.depreciationMethod === fixed_asset_entity_1.DepreciationMethod.STRAIGHT_LINE) {
            annualDepreciation = Number(asset.purchaseCost) / asset.usefulLifeYears;
        }
        else {
            const rate = 2 / asset.usefulLifeYears;
            annualDepreciation = (Number(asset.purchaseCost) - Number(asset.accumulatedDepreciation)) * rate;
        }
        const newAccumulated = Number(asset.accumulatedDepreciation) + annualDepreciation;
        asset.accumulatedDepreciation = newAccumulated;
        asset.netBookValue = Math.max(0, Number(asset.purchaseCost) - newAccumulated);
        return this.assetRepository.save(asset);
    }
    async getAssetRegister() {
        const assets = await this.findAll();
        const totalCost = assets.reduce((s, a) => s + Number(a.purchaseCost), 0);
        const totalDepreciation = assets.reduce((s, a) => s + Number(a.accumulatedDepreciation), 0);
        const totalNetBookValue = assets.reduce((s, a) => s + Number(a.netBookValue), 0);
        return {
            assets,
            summary: {
                totalCost,
                totalDepreciation,
                totalNetBookValue,
                assetCount: assets.length,
            },
        };
    }
    async getDepreciationSchedule() {
        const assets = await this.assetRepository.find({
            where: { status: fixed_asset_entity_1.AssetStatus.ACTIVE },
        });
        return assets.map(a => ({
            asset: { code: a.assetCode, name: a.name, category: a.category },
            purchaseCost: a.purchaseCost,
            usefulLife: a.usefulLifeYears,
            method: a.depreciationMethod,
            accumulatedDepreciation: a.accumulatedDepreciation,
            netBookValue: a.netBookValue,
            annualDepreciation: a.usefulLifeYears
                ? Number(a.purchaseCost) / a.usefulLifeYears
                : 0,
        }));
    }
};
exports.FixedAssetService = FixedAssetService;
exports.FixedAssetService = FixedAssetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fixed_asset_entity_1.FixedAsset)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FixedAssetService);
//# sourceMappingURL=fixed-asset.service.js.map