export declare enum AssetStatus {
    ACTIVE = "active",
    DISPOSED = "disposed",
    UNDER_MAINTENANCE = "under_maintenance"
}
export declare enum DepreciationMethod {
    STRAIGHT_LINE = "straight_line",
    DECLINING_BALANCE = "declining_balance"
}
export declare class FixedAsset {
    id: string;
    assetCode: string;
    name: string;
    category: string;
    location: string;
    purchaseDate: Date;
    purchaseCost: number;
    accumulatedDepreciation: number;
    netBookValue: number;
    usefulLifeYears: number;
    depreciationMethod: DepreciationMethod;
    status: AssetStatus;
    disposedAt: Date;
    disposalProceeds: number;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
