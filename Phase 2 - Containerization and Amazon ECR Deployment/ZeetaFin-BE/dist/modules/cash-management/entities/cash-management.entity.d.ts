export declare class BankAccount {
    id: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    branch: string;
    currentBalance: number;
    currency: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CashTransaction {
    id: string;
    bankAccountId: string;
    transactionDate: Date;
    type: 'inflow' | 'outflow';
    amount: number;
    category: string;
    referenceNumber: string;
    description: string;
    createdAt: Date;
}
export declare class BankReconciliation {
    id: string;
    bankAccountId: string;
    statementDate: Date;
    statementBalance: number;
    systemBalance: number;
    difference: number;
    reconcilingItems: any;
    isReconciled: boolean;
    createdAt: Date;
}
