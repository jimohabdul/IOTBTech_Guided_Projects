import { CashManagementService } from '../services/cash-management.service';
import { CreateBankAccountDto, CreateCashTransactionDto, CreateReconciliationDto } from '../dto/cash-management.dto';
export declare class CashManagementController {
    private cashService;
    constructor(cashService: CashManagementService);
    findAllAccounts(): Promise<import("../entities/cash-management.entity").BankAccount[]>;
    findAccount(id: string): Promise<import("../entities/cash-management.entity").BankAccount>;
    createAccount(dto: CreateBankAccountDto): Promise<import("../entities/cash-management.entity").BankAccount>;
    getCashPosition(): Promise<{
        accounts: import("../entities/cash-management.entity").BankAccount[];
        totalBalance: number;
        reportDate: Date;
    }>;
    recordTransaction(dto: CreateCashTransactionDto): Promise<import("../entities/cash-management.entity").CashTransaction>;
    getTransactions(accountId?: string): Promise<import("../entities/cash-management.entity").CashTransaction[]>;
    reconcile(dto: CreateReconciliationDto): Promise<import("../entities/cash-management.entity").BankReconciliation>;
}
