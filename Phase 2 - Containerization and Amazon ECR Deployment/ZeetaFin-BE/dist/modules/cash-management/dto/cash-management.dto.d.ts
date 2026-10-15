export declare class CreateBankAccountDto {
    accountName: string;
    accountNumber: string;
    bankName?: string;
    branch?: string;
    currentBalance?: number;
    currency?: string;
}
export declare class CreateCashTransactionDto {
    bankAccountId: string;
    transactionDate: string;
    type: 'inflow' | 'outflow';
    amount: number;
    category?: string;
    referenceNumber?: string;
    description?: string;
}
export declare class CreateReconciliationDto {
    bankAccountId: string;
    statementDate: string;
    statementBalance: number;
    reconcilingItems?: any;
}
