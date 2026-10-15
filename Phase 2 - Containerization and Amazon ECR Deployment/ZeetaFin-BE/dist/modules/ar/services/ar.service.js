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
exports.ARService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../entities/customer.entity");
const ar_invoice_entity_1 = require("../entities/ar-invoice.entity");
let ARService = class ARService {
    constructor(customerRepository, invoiceRepository, receiptRepository, creditNoteRepository) {
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.receiptRepository = receiptRepository;
        this.creditNoteRepository = creditNoteRepository;
    }
    async findAllCustomers() {
        return this.customerRepository.find({ order: { name: 'ASC' } });
    }
    async findCustomer(id) {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return customer;
    }
    async createCustomer(dto) {
        const customer = this.customerRepository.create(dto);
        return this.customerRepository.save(customer);
    }
    async findAllInvoices(status) {
        const where = {};
        if (status)
            where.status = status;
        return this.invoiceRepository.find({
            where,
            relations: ['customer'],
            order: { createdAt: 'DESC' },
        });
    }
    async findInvoice(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: ['customer'],
        });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
    }
    async createInvoice(dto) {
        const invoice = this.invoiceRepository.create({
            ...dto,
            invoiceDate: dto.invoiceDate,
            dueDate: dto.dueDate,
            outstandingAmount: dto.amount,
            status: ar_invoice_entity_1.ARInvoiceStatus.SENT,
        });
        const saved = await this.invoiceRepository.save(invoice);
        await this.customerRepository.update(dto.customerId, {
            outstandingBalance: () => `outstanding_balance + ${dto.amount}`,
        });
        return this.findInvoice(saved.id);
    }
    async createReceipt(dto) {
        const invoice = await this.findInvoice(dto.invoiceId);
        if (invoice.status === ar_invoice_entity_1.ARInvoiceStatus.PAID) {
            throw new common_1.BadRequestException('Invoice is already paid');
        }
        if (dto.amount > invoice.outstandingAmount) {
            throw new common_1.BadRequestException('Receipt amount exceeds outstanding balance');
        }
        const receipt = this.receiptRepository.create({
            ...dto,
            receiptDate: dto.receiptDate,
        });
        await this.receiptRepository.save(receipt);
        const newPaid = Number(invoice.paidAmount) + dto.amount;
        const newOutstanding = Number(invoice.outstandingAmount) - dto.amount;
        const newStatus = newOutstanding <= 0 ? ar_invoice_entity_1.ARInvoiceStatus.PAID : ar_invoice_entity_1.ARInvoiceStatus.PARTIAL;
        await this.invoiceRepository.update(dto.invoiceId, {
            paidAmount: newPaid,
            outstandingAmount: newOutstanding,
            status: newStatus,
        });
        await this.customerRepository.update(invoice.customerId, {
            outstandingBalance: () => `outstanding_balance - ${dto.amount}`,
        });
        return receipt;
    }
    async createCreditNote(dto) {
        const invoice = await this.findInvoice(dto.invoiceId);
        const count = await this.creditNoteRepository.count();
        const creditNote = this.creditNoteRepository.create({
            ...dto,
            creditNoteNumber: `CN-${String(count + 1).padStart(6, '0')}`,
            creditNoteDate: dto.creditNoteDate,
        });
        await this.creditNoteRepository.save(creditNote);
        const newOutstanding = Number(invoice.outstandingAmount) - dto.amount;
        const newStatus = newOutstanding <= 0 ? ar_invoice_entity_1.ARInvoiceStatus.PAID : invoice.status;
        await this.invoiceRepository.update(dto.invoiceId, {
            outstandingAmount: newOutstanding,
            status: newStatus,
        });
        await this.customerRepository.update(invoice.customerId, {
            outstandingBalance: () => `outstanding_balance - ${dto.amount}`,
        });
        return creditNote;
    }
    async getAgingReport() {
        const invoices = await this.invoiceRepository.find({
            where: [
                { status: ar_invoice_entity_1.ARInvoiceStatus.SENT },
                { status: ar_invoice_entity_1.ARInvoiceStatus.PARTIAL },
                { status: ar_invoice_entity_1.ARInvoiceStatus.OVERDUE },
            ],
            relations: ['customer'],
        });
        const now = new Date();
        const buckets = { '0-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };
        const details = [];
        for (const inv of invoices) {
            const diffDays = Math.floor((now.getTime() - new Date(inv.dueDate).getTime()) / (1000 * 3600 * 24));
            let bucket;
            if (diffDays <= 30)
                bucket = '0-30';
            else if (diffDays <= 60)
                bucket = '31-60';
            else if (diffDays <= 90)
                bucket = '61-90';
            else
                bucket = '90+';
            buckets[bucket] += Number(inv.outstandingAmount);
            details.push({ invoice: inv, daysOverdue: diffDays, bucket });
        }
        return { buckets, details, totalOutstanding: invoices.reduce((s, i) => s + Number(i.outstandingAmount), 0) };
    }
};
exports.ARService = ARService;
exports.ARService = ARService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(ar_invoice_entity_1.ARInvoice)),
    __param(2, (0, typeorm_1.InjectRepository)(ar_invoice_entity_1.ARReceipt)),
    __param(3, (0, typeorm_1.InjectRepository)(ar_invoice_entity_1.ARCreditNote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ARService);
//# sourceMappingURL=ar.service.js.map