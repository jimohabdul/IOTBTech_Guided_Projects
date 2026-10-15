import { DepreciationMethod } from '../entities/fixed-asset.entity';
export declare class CreateFixedAssetDto {
    assetCode: string;
    name: string;
    category?: string;
    location?: string;
    purchaseDate: string;
    purchaseCost: number;
    usefulLifeYears?: number;
    depreciationMethod?: DepreciationMethod;
    notes?: string;
}
export declare class AssetTransferDto {
    location: string;
}
export declare class AssetDisposalDto {
    disposedAt: string;
    disposalProceeds: number;
    notes?: string;
}
