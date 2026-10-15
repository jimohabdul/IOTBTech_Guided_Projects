import { FixedAssetService } from '../services/fixed-asset.service';
import { CreateFixedAssetDto, AssetTransferDto, AssetDisposalDto } from '../dto/fixed-asset.dto';
export declare class FixedAssetController {
    private assetService;
    constructor(assetService: FixedAssetService);
    findAll(): Promise<import("../entities/fixed-asset.entity").FixedAsset[]>;
    findOne(id: string): Promise<import("../entities/fixed-asset.entity").FixedAsset>;
    create(dto: CreateFixedAssetDto): Promise<import("../entities/fixed-asset.entity").FixedAsset>;
    transfer(id: string, dto: AssetTransferDto): Promise<import("../entities/fixed-asset.entity").FixedAsset>;
    dispose(id: string, dto: AssetDisposalDto): Promise<import("../entities/fixed-asset.entity").FixedAsset>;
    depreciate(id: string): Promise<import("../entities/fixed-asset.entity").FixedAsset>;
    getRegister(): Promise<{
        assets: import("../entities/fixed-asset.entity").FixedAsset[];
        summary: {
            totalCost: number;
            totalDepreciation: number;
            totalNetBookValue: number;
            assetCount: number;
        };
    }>;
    getDepreciationSchedule(): Promise<{
        asset: {
            code: string;
            name: string;
            category: string;
        };
        purchaseCost: number;
        usefulLife: number;
        method: import("../entities/fixed-asset.entity").DepreciationMethod;
        accumulatedDepreciation: number;
        netBookValue: number;
        annualDepreciation: number;
    }[]>;
}
