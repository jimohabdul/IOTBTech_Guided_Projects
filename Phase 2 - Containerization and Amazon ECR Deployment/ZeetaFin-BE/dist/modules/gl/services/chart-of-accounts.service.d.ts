import { Repository } from 'typeorm';
import { ChartOfAccount } from '../entities/chart-of-account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../dto/chart-of-account.dto';
export declare class ChartOfAccountsService {
    private accountRepository;
    constructor(accountRepository: Repository<ChartOfAccount>);
    findAll(): Promise<ChartOfAccount[]>;
    findOne(id: string): Promise<ChartOfAccount>;
    create(dto: CreateAccountDto): Promise<ChartOfAccount>;
    update(id: string, dto: UpdateAccountDto): Promise<ChartOfAccount>;
    remove(id: string): Promise<void>;
    getTrialBalance(): Promise<{
        accounts: ChartOfAccount[];
        totalDebit: number;
        totalCredit: number;
    }>;
    getBalanceSheet(): Promise<{
        assets: {
            accounts: ChartOfAccount[];
            total: number;
        };
        liabilities: {
            accounts: ChartOfAccount[];
            total: number;
        };
        equity: {
            accounts: ChartOfAccount[];
            total: number;
        };
        totalLiabilitiesAndEquity: number;
    }>;
    getProfitAndLoss(from?: string, to?: string): Promise<{
        revenue: {
            accounts: ChartOfAccount[];
            total: number;
        };
        expenses: {
            accounts: ChartOfAccount[];
            total: number;
        };
        netIncome: number;
    }>;
}
