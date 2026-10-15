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
exports.ARReceipt = exports.ARCreditNote = exports.ARInvoice = exports.ARInvoiceStatus = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
var ARInvoiceStatus;
(function (ARInvoiceStatus) {
    ARInvoiceStatus["DRAFT"] = "draft";
    ARInvoiceStatus["SENT"] = "sent";
    ARInvoiceStatus["PARTIAL"] = "partial";
    ARInvoiceStatus["PAID"] = "paid";
    ARInvoiceStatus["OVERDUE"] = "overdue";
    ARInvoiceStatus["CANCELLED"] = "cancelled";
})(ARInvoiceStatus || (exports.ARInvoiceStatus = ARInvoiceStatus = {}));
let ARInvoice = class ARInvoice {
};
exports.ARInvoice = ARInvoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ARInvoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ARInvoice.prototype, "invoiceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ARInvoice.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], ARInvoice.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ARInvoice.prototype, "invoiceDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ARInvoice.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ARInvoice.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ARInvoice.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ARInvoice.prototype, "outstandingAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ARInvoiceStatus,
        default: ARInvoiceStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ARInvoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ARInvoice.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ARInvoice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ARInvoice.prototype, "updatedAt", void 0);
exports.ARInvoice = ARInvoice = __decorate([
    (0, typeorm_1.Entity)('ar_invoices')
], ARInvoice);
let ARCreditNote = class ARCreditNote {
};
exports.ARCreditNote = ARCreditNote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ARCreditNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ARCreditNote.prototype, "creditNoteNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ARCreditNote.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ARInvoice),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    __metadata("design:type", ARInvoice)
], ARCreditNote.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ARCreditNote.prototype, "creditNoteDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ARCreditNote.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ARCreditNote.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ARCreditNote.prototype, "createdAt", void 0);
exports.ARCreditNote = ARCreditNote = __decorate([
    (0, typeorm_1.Entity)('ar_credit_notes')
], ARCreditNote);
let ARReceipt = class ARReceipt {
};
exports.ARReceipt = ARReceipt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ARReceipt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ARReceipt.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ARInvoice),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    __metadata("design:type", ARInvoice)
], ARReceipt.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ARReceipt.prototype, "receiptDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ARReceipt.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ARReceipt.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ARReceipt.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ARReceipt.prototype, "createdAt", void 0);
exports.ARReceipt = ARReceipt = __decorate([
    (0, typeorm_1.Entity)('ar_receipts')
], ARReceipt);
//# sourceMappingURL=ar-invoice.entity.js.map