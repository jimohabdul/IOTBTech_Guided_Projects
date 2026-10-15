declare class JournalEntryLineDto {
    accountId: string;
    debit: number;
    credit: number;
    description?: string;
}
export declare class CreateJournalEntryDto {
    entryDate: string;
    description?: string;
    lines: JournalEntryLineDto[];
}
export {};
