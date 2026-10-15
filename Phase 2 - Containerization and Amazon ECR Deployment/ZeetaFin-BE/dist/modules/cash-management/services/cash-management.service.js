"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashManagementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cash_management_entity_1 = require("../entities/cash-management.entity");
let CashManagementService = class CashManagementService {
    constructor(bankAccountRepository, transactionRepository, reconciliationRepository) {
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
        this.reconciliationRepository = reconciliationRepository;
    }
    async findAllBankAccounts() {
        return this.bankAccountRepository.find({ order: { accountName: 'ASC' } });
    }
    async findBankAccount(id) {
        const account = await this.bankAccountRepository.findOne({ where: { id } });
        if (!account)
            throw new common_1.NotFoundException('Bank account not found');
        return account;
    }
    async createBankAccount(dto) {
        const account = this.bankAccountRepository.create(dto);
        return this.bankAccountRepository.save(account);
    }
    async getCashPosition() {
        const accounts = await this.findAllBankAccounts();
        const totalBalance = accounts.reduce((s, a) => s + Number(a.currentBalance), 0);
        return { accounts, totalBalance, reportDate: new Date() };
    }
    async recordTransaction(dto) {
        const account = await this.findBankAccount(dto.bankAccountId);
        const transaction = this.transactionRepository.create({
            ...dto,
            transactionDate: dto.transactionDate,
        });
        await this.transactionRepository.save(transaction);
        const balanceChange = dto.type === 'inflow' ? dto.amount : -dto.amount;
        await this.bankAccountRepository.update(dto.bankAccountId, {
            currentBalance: () => `current_balance + ${balanceChange}`,
        });
        return transaction;
    }
    async getTransactions(accountId) {
        const where = {};
        if (accountId)
            where.bankAccountId = accountId;
        return this.transactionRepository.find({
            where,
            order: { transactionDate: 'DESC' },
        });
    }
    async reconcile(dto) {
        const account = await this.findBankAccount(dto.bankAccountId);
        const difference = dto.statementBalance - Number(account.currentBalance);
        const reconciliation = this.reconciliationRepository.create({
            bankAccountId: dto.bankAccountId,
            statementDate: dto.statementDate,
            statementBalance: dto.statementBalance,
            systemBalance: Number(account.currentBalance),
            difference,
            reconcilingItems: dto.reconcilingItems || [],
            isReconciled: Math.abs(difference) < 0.01,
        });
        return this.reconciliationRepository.save(reconciliation);
    }
};
exports.CashManagementService = CashManagementService;
exports.CashManagementService = CashManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cash_management_entity_1.BankAccount)),
    __param(1, (0, typeorm_1.InjectRepository)(cash_management_entity_1.CashTransaction)),
    __param(2, (0, typeorm_1.InjectRepository)(cash_management_entity_1.BankReconciliation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CashManagementService);
//# sourceMappingURL=cash-management.service.js.map