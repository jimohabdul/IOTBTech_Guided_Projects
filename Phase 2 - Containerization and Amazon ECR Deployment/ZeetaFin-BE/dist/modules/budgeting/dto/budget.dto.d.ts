declare class BudgetLineDto {
    accountId: string;
    plannedAmount: number;
    notes?: string;
}
export declare class CreateBudgetDto {
    name: string;
    fiscalYear: number;
    department?: string;
    notes?: string;
    lines: BudgetLineDto[];
}
export declare class BudgetRevisionDto {
    lines: BudgetLineDto[];
}
export {};
