export declare enum BudgetStatus {
    DRAFT = "draft",
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Budget {
    id: string;
    name: string;
    fiscalYear: number;
    department: string;
    totalAmount: number;
    status: BudgetStatus;
    approvedById: string;
    approvedAt: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class BudgetLine {
    id: string;
    budgetId: string;
    accountId: string;
    plannedAmount: number;
    actualAmount: number;
    variance: number;
    notes: string;
}
