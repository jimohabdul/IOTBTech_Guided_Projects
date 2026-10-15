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
exports.ChartOfAccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
let ChartOfAccountsService = class ChartOfAccountsService {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    async findAll() {
        return this.accountRepository.find({ order: { code: 'ASC' } });
    }
    async findOne(id) {
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account)
            throw new common_1.NotFoundException('Account not found');
        return account;
    }
    async create(dto) {
        const existing = await this.accountRepository.findOne({ where: { code: dto.code } });
        if (existing)
            throw new common_1.BadRequestException('Account code already exists');
        const account = this.accountRepository.create(dto);
        return this.accountRepository.save(account);
    }
    async update(id, dto) {
        const account = await this.findOne(id);
        Object.assign(account, dto);
        return this.accountRepository.save(account);
    }
    async remove(id) {
        const account = await this.findOne(id);
        await this.accountRepository.remove(account);
    }
    async getTrialBalance() {
        const accounts = await this.accountRepository.find({
            where: { isActive: true },
            order: { code: 'ASC' },
        });
        const totalDebit = accounts.reduce((sum, a) => sum + (a.balance > 0 ? Number(a.balance) : 0), 0);
        const totalCredit = accounts.reduce((sum, a) => sum + (a.balance < 0 ? Math.abs(Number(a.balance)) : 0), 0);
        return { accounts, totalDebit, totalCredit };
    }
    async getBalanceSheet() {
        const accounts = await this.accountRepository.find({
            where: { isActive: true },
            order: { code: 'ASC' },
        });
        const assets = accounts.filter(a => a.type === 'asset');
        const liabilities = accounts.filter(a => a.type === 'liability');
        const equity = accounts.filter(a => a.type === 'equity');
        const totalAssets = assets.reduce((s, a) => s + Number(a.balance), 0);
        const totalLiabilities = liabilities.reduce((s, a) => s + Number(a.balance), 0);
        const totalEquity = equity.reduce((s, a) => s + Number(a.balance), 0);
        return {
            assets: { accounts: assets, total: totalAssets },
            liabilities: { accounts: liabilities, total: totalLiabilities },
            equity: { accounts: equity, total: totalEquity },
            totalLiabilitiesAndEquity: totalLiabilities + totalEquity,
        };
    }
    async getProfitAndLoss(from, to) {
        const accounts = await this.accountRepository.find({
            where: { isActive: true },
            order: { code: 'ASC' },
        });
        const revenue = accounts.filter(a => a.type === 'revenue');
        const expenses = accounts.filter(a => a.type === 'expense');
        const totalRevenue = revenue.reduce((s, a) => s + Number(a.balance), 0);
        const totalExpenses = expenses.reduce((s, a) => s + Number(a.balance), 0);
        return {
            revenue: { accounts: revenue, total: totalRevenue },
            expenses: { accounts: expenses, total: totalExpenses },
            netIncome: totalRevenue - totalExpenses,
        };
    }
};
exports.ChartOfAccountsService = ChartOfAccountsService;
exports.ChartOfAccountsService = ChartOfAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChartOfAccountsService);
//# sourceMappingURL=chart-of-accounts.service.js.map