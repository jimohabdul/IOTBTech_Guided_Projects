import { Repository } from 'typeorm';
import { FixedAsset, DepreciationMethod } from '../entities/fixed-asset.entity';
import { CreateFixedAssetDto, AssetTransferDto, AssetDisposalDto } from '../dto/fixed-asset.dto';
export declare class FixedAssetService {
    private assetRepository;
    constructor(assetRepository: Repository<FixedAsset>);
    findAll(): Promise<FixedAsset[]>;
    findOne(id: string): Promise<FixedAsset>;
    create(dto: CreateFixedAssetDto): Promise<FixedAsset>;
    transfer(id: string, dto: AssetTransferDto): Promise<FixedAsset>;
    dispose(id: string, dto: AssetDisposalDto): Promise<FixedAsset>;
    calculateDepreciation(id: string): Promise<FixedAsset>;
    getAssetRegister(): Promise<{
        assets: FixedAsset[];
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
        method: DepreciationMethod;
        accumulatedDepreciation: number;
        netBookValue: number;
        annualDepreciation: number;
    }[]>;
}
