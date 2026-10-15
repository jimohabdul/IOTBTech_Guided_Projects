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
exports.BudgetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const budget_entity_1 = require("../entities/budget.entity");
const chart_of_account_entity_1 = require("../../gl/entities/chart-of-account.entity");
let BudgetService = class BudgetService {
    constructor(budgetRepository, budgetLineRepository, accountRepository) {
        this.budgetRepository = budgetRepository;
        this.budgetLineRepository = budgetLineRepository;
        this.accountRepository = accountRepository;
    }
    async findAll() {
        return this.budgetRepository.find({ order: { fiscalYear: 'DESC', createdAt: 'DESC' } });
    }
    async findOne(id) {
        const budget = await this.budgetRepository.findOne({
            where: { id },
            relations: ['lines'],
        });
        if (!budget)
            throw new common_1.NotFoundException('Budget not found');
        return budget;
    }
    async create(dto) {
        const totalAmount = dto.lines.reduce((s, l) => s + l.plannedAmount, 0);
        const budget = this.budgetRepository.create({
            name: dto.name,
            fiscalYear: dto.fiscalYear,
            department: dto.department,
            notes: dto.notes,
            totalAmount,
        });
        const savedBudget = await this.budgetRepository.save(budget);
        for (const lineDto of dto.lines) {
            const account = await this.accountRepository.findOne({ where: { id: lineDto.accountId } });
            if (!account)
                throw new common_1.NotFoundException(`Account ${lineDto.accountId} not found`);
            const line = this.budgetLineRepository.create({
                budgetId: savedBudget.id,
                accountId: lineDto.accountId,
                plannedAmount: lineDto.plannedAmount,
                actualAmount: Number(account.balance),
                variance: lineDto.plannedAmount - Number(account.balance),
                notes: lineDto.notes,
            });
            await this.budgetLineRepository.save(line);
        }
        return this.findOne(savedBudget.id);
    }
    async approve(id, userId) {
        const budget = await this.findOne(id);
        if (budget.status !== budget_entity_1.BudgetStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft budgets can be approved');
        }
        budget.status = budget_entity_1.BudgetStatus.APPROVED;
        budget.approvedById = userId;
        budget.approvedAt = new Date();
        return this.budgetRepository.save(budget);
    }
    async getVarianceReport(budgetId) {
        const budget = await this.findOne(budgetId);
        const lines = await this.budgetLineRepository.find({
            where: { budgetId },
        });
        const totalPlanned = lines.reduce((s, l) => s + Number(l.plannedAmount), 0);
        const totalActual = lines.reduce((s, l) => s + Number(l.actualAmount), 0);
        const totalVariance = totalPlanned - totalActual;
        return {
            budget,
            lines,
            summary: {
                totalPlanned,
                totalActual,
                totalVariance,
                variancePercentage: totalPlanned > 0 ? (totalVariance / totalPlanned) * 100 : 0,
            },
        };
    }
};
exports.BudgetService = BudgetService;
exports.BudgetService = BudgetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(budget_entity_1.Budget)),
    __param(1, (0, typeorm_1.InjectRepository)(budget_entity_1.BudgetLine)),
    __param(2, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BudgetService);
//# sourceMappingURL=budget.service.js.map