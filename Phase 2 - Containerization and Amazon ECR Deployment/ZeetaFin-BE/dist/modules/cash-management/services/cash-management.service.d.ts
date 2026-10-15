import { Repository } from 'typeorm';
import { BankAccount, CashTransaction, BankReconciliation } from '../entities/cash-management.entity';
import { CreateBankAccountDto, CreateCashTransactionDto, CreateReconciliationDto } from '../dto/cash-management.dto';
export declare class CashManagementService {
    private bankAccountRepository;
    private transactionRepository;
    private reconciliationRepository;
    constructor(bankAccountRepository: Repository<BankAccount>, transactionRepository: Repository<CashTransaction>, reconciliationRepository: Repository<BankReconciliation>);
    findAllBankAccounts(): Promise<BankAccount[]>;
    findBankAccount(id: string): Promise<BankAccount>;
    createBankAccount(dto: CreateBankAccountDto): Promise<BankAccount>;
    getCashPosition(): Promise<{
        accounts: BankAccount[];
        totalBalance: number;
        reportDate: Date;
    }>;
    recordTransaction(dto: CreateCashTransactionDto): Promise<CashTransaction>;
    getTransactions(accountId?: string): Promise<CashTransaction[]>;
    reconcile(dto: CreateReconciliationDto): Promise<BankReconciliation>;
}
