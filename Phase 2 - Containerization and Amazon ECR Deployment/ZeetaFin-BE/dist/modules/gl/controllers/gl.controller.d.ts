import { ChartOfAccountsService } from '../services/chart-of-accounts.service';
import { JournalEntriesService } from '../services/journal-entries.service';
import { CreateAccountDto, UpdateAccountDto } from '../dto/chart-of-account.dto';
import { CreateJournalEntryDto } from '../dto/journal-entry.dto';
export declare class GLController {
    private accountsService;
    private journalService;
    constructor(accountsService: ChartOfAccountsService, journalService: JournalEntriesService);
    findAllAccounts(): Promise<import("../entities/chart-of-account.entity").ChartOfAccount[]>;
    findOneAccount(id: string): Promise<import("../entities/chart-of-account.entity").ChartOfAccount>;
    createAccount(dto: CreateAccountDto): Promise<import("../entities/chart-of-account.entity").ChartOfAccount>;
    updateAccount(id: string, dto: UpdateAccountDto): Promise<import("../entities/chart-of-account.entity").ChartOfAccount>;
    findAllJournals(status?: string): Promise<import("../entities/journal-entry.entity").JournalEntry[]>;
    findOneJournal(id: string): Promise<import("../entities/journal-entry.entity").JournalEntry>;
    createJournal(dto: CreateJournalEntryDto, req: any): Promise<import("../entities/journal-entry.entity").JournalEntry>;
    approveJournal(id: string, req: any): Promise<import("../entities/journal-entry.entity").JournalEntry>;
    postJournal(id: string): Promise<import("../entities/journal-entry.entity").JournalEntry>;
    getTrialBalance(): Promise<{
        accounts: import("../entities/chart-of-account.entity").ChartOfAccount[];
        totalDebit: number;
        totalCredit: number;
    }>;
    getBalanceSheet(): Promise<{
        assets: {
            accounts: import("../entities/chart-of-account.entity").ChartOfAccount[];
            total: number;
        };
        liabilities: {
            accounts: import("../entities/chart-of-account.entity").ChartOfAccount[];
            total: number;
        };
        equity: {
            accounts: import("../entities/chart-of-account.entity").ChartOfAccount[];
            total: number;
        };
        totalLiabilitiesAndEquity: number;
    }>;
    getProfitAndLoss(from?: string, to?: string): Promise<{
        revenue: {
            accounts: import("../entities/chart-of-account.entity").ChartOfAccount[];
            total: number;
        };
        expenses: {
            accounts: import("../entities/chart-of-account.entity").ChartOfAccount[];
            total: number;
        };
        netIncome: number;
    }>;
}
