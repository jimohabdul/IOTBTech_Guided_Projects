export declare enum AccountType {
    ASSET = "asset",
    LIABILITY = "liability",
    EQUITY = "equity",
    REVENUE = "revenue",
    EXPENSE = "expense"
}
export declare enum AccountSubType {
    CURRENT_ASSET = "current_asset",
    NON_CURRENT_ASSET = "non_current_asset",
    CURRENT_LIABILITY = "current_liability",
    NON_CURRENT_LIABILITY = "non_current_liability",
    SHAREHOLDERS_EQUITY = "shareholders_equity",
    OPERATING_REVENUE = "operating_revenue",
    OPERATING_EXPENSE = "operating_expense",
    OTHER_INCOME = "other_income",
    OTHER_EXPENSE = "other_expense"
}
export declare class ChartOfAccount {
    id: string;
    code: string;
    name: string;
    type: AccountType;
    subType: AccountSubType;
    parentId: string;
    isActive: boolean;
    description: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}
