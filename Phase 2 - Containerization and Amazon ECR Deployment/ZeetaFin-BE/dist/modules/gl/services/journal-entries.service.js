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
exports.JournalEntriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const journal_entry_entity_1 = require("../entities/journal-entry.entity");
const chart_of_account_entity_1 = require("../entities/chart-of-account.entity");
let JournalEntriesService = class JournalEntriesService {
    constructor(journalRepository, lineRepository, accountRepository, dataSource) {
        this.journalRepository = journalRepository;
        this.lineRepository = lineRepository;
        this.accountRepository = accountRepository;
        this.dataSource = dataSource;
    }
    async findAll(status) {
        const where = {};
        if (status)
            where.status = status;
        return this.journalRepository.find({
            where,
            order: { entryDate: 'DESC', createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const entry = await this.journalRepository.findOne({
            where: { id },
            relations: ['lines', 'lines.account'],
        });
        if (!entry)
            throw new common_1.NotFoundException('Journal entry not found');
        return entry;
    }
    async create(dto, userId) {
        const totalDebit = dto.lines.reduce((s, l) => s + l.debit, 0);
        const totalCredit = dto.lines.reduce((s, l) => s + l.credit, 0);
        if (Math.abs(totalDebit - totalCredit) > 0.01) {
            throw new common_1.BadRequestException('Total debits must equal total credits');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const count = await this.journalRepository.count();
            const entryNumber = `JE-${String(count + 1).padStart(6, '0')}`;
            const entry = this.journalRepository.create({
                entryNumber,
                entryDate: dto.entryDate,
                description: dto.description,
                totalDebit,
                totalCredit,
                status: journal_entry_entity_1.JournalEntryStatus.DRAFT,
                createdById: userId,
            });
            const savedEntry = await queryRunner.manager.save(entry);
            for (const lineDto of dto.lines) {
                const account = await this.accountRepository.findOne({ where: { id: lineDto.accountId } });
                if (!account)
                    throw new common_1.NotFoundException(`Account ${lineDto.accountId} not found`);
                const line = this.lineRepository.create({
                    journalEntryId: savedEntry.id,
                    accountId: lineDto.accountId,
                    debit: lineDto.debit,
                    credit: lineDto.credit,
                    description: lineDto.description,
                });
                await queryRunner.manager.save(line);
                const balanceChange = lineDto.debit - lineDto.credit;
                await queryRunner.manager.update(chart_of_account_entity_1.ChartOfAccount, lineDto.accountId, {
                    balance: () => `balance + ${balanceChange}`,
                });
            }
            await queryRunner.commitTransaction();
            return this.findOne(savedEntry.id);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async approve(id, userId) {
        const entry = await this.findOne(id);
        if (entry.status !== journal_entry_entity_1.JournalEntryStatus.DRAFT) {
            throw new common_1.BadRequestException('Only draft entries can be approved');
        }
        entry.status = journal_entry_entity_1.JournalEntryStatus.APPROVED;
        entry.approvedById = userId;
        entry.approvedAt = new Date();
        return this.journalRepository.save(entry);
    }
    async post(id) {
        const entry = await this.findOne(id);
        if (entry.status !== journal_entry_entity_1.JournalEntryStatus.APPROVED) {
            throw new common_1.BadRequestException('Only approved entries can be posted');
        }
        entry.status = journal_entry_entity_1.JournalEntryStatus.POSTED;
        return this.journalRepository.save(entry);
    }
};
exports.JournalEntriesService = JournalEntriesService;
exports.JournalEntriesService = JournalEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(journal_entry_entity_1.JournalEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(journal_entry_entity_1.JournalEntryLine)),
    __param(2, (0, typeorm_1.InjectRepository)(chart_of_account_entity_1.ChartOfAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], JournalEntriesService);
//# sourceMappingURL=journal-entries.service.js.map