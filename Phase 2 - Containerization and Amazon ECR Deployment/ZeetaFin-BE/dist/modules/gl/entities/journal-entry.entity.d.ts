import { ChartOfAccount } from './chart-of-account.entity';
export declare enum JournalEntryStatus {
    DRAFT = "draft",
    POSTED = "posted",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class JournalEntry {
    id: string;
    entryNumber: string;
    entryDate: Date;
    description: string;
    status: JournalEntryStatus;
    totalDebit: number;
    totalCredit: number;
    approvedById: string;
    approvedAt: Date;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class JournalEntryLine {
    id: string;
    journalEntryId: string;
    journalEntry: JournalEntry;
    accountId: string;
    account: ChartOfAccount;
    debit: number;
    credit: number;
    description: string;
}
