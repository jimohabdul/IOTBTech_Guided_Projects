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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryLine = exports.JournalEntry = exports.JournalEntryStatus = void 0;
const typeorm_1 = require("typeorm");
const chart_of_account_entity_1 = require("./chart-of-account.entity");
var JournalEntryStatus;
(function (JournalEntryStatus) {
    JournalEntryStatus["DRAFT"] = "draft";
    JournalEntryStatus["POSTED"] = "posted";
    JournalEntryStatus["APPROVED"] = "approved";
    JournalEntryStatus["REJECTED"] = "rejected";
})(JournalEntryStatus || (exports.JournalEntryStatus = JournalEntryStatus = {}));
let JournalEntry = class JournalEntry {
};
exports.JournalEntry = JournalEntry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JournalEntry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], JournalEntry.prototype, "entryNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], JournalEntry.prototype, "entryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JournalEntry.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: JournalEntryStatus,
        default: JournalEntryStatus.DRAFT,
    }),
    __metadata("design:type", String)
], JournalEntry.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], JournalEntry.prototype, "totalDebit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], JournalEntry.prototype, "totalCredit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], JournalEntry.prototype, "approvedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], JournalEntry.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JournalEntry.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JournalEntry.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JournalEntry.prototype, "updatedAt", void 0);
exports.JournalEntry = JournalEntry = __decorate([
    (0, typeorm_1.Entity)('journal_entries')
], JournalEntry);
let JournalEntryLine = class JournalEntryLine {
};
exports.JournalEntryLine = JournalEntryLine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], JournalEntryLine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JournalEntryLine.prototype, "journalEntryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JournalEntry),
    (0, typeorm_1.JoinColumn)({ name: 'journalEntryId' }),
    __metadata("design:type", JournalEntry)
], JournalEntryLine.prototype, "journalEntry", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JournalEntryLine.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chart_of_account_entity_1.ChartOfAccount),
    (0, typeorm_1.JoinColumn)({ name: 'accountId' }),
    __metadata("design:type", chart_of_account_entity_1.ChartOfAccount)
], JournalEntryLine.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], JournalEntryLine.prototype, "debit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], JournalEntryLine.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], JournalEntryLine.prototype, "description", void 0);
exports.JournalEntryLine = JournalEntryLine = __decorate([
    (0, typeorm_1.Entity)('journal_entry_lines')
], JournalEntryLine);
//# sourceMappingURL=journal-entry.entity.js.map