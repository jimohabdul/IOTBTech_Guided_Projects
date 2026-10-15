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
exports.APService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vendor_entity_1 = require("../entities/vendor.entity");
const ap_invoice_entity_1 = require("../entities/ap-invoice.entity");
const ap_payment_entity_1 = require("../entities/ap-payment.entity");
let APService = class APService {
    constructor(vendorRepository, invoiceRepository, paymentRepository) {
        this.vendorRepository = vendorRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
    }
    async findAllVendors() {
        return this.vendorRepository.find({ order: { name: 'ASC' } });
    }
    async findVendor(id) {
        const vendor = await this.vendorRepository.findOne({ where: { id } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        return vendor;
    }
    async createVendor(dto) {
        const vendor = this.vendorRepository.create(dto);
        return this.vendorRepository.save(vendor);
    }
    async findAllInvoices(status) {
        const where = {};
        if (status)
            where.status = status;
        return this.invoiceRepository.find({
            where,
            relations: ['vendor'],
            order: { createdAt: 'DESC' },
        });
    }
    async findInvoice(id) {
        const invoice = await this.invoiceRepository.findOne({
            where: { id },
            relations: ['vendor'],
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
            status: ap_invoice_entity_1.InvoiceStatus.PENDING,
        });
        const saved = await this.invoiceRepository.save(invoice);
        await this.vendorRepository.update(dto.vendorId, {
            outstandingBalance: () => `outstanding_balance + ${dto.amount}`,
        });
        return this.findInvoice(saved.id);
    }
    async approveInvoice(id, userId) {
        const invoice = await this.findInvoice(id);
        if (invoice.status !== ap_invoice_entity_1.InvoiceStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending invoices can be approved');
        }
        invoice.status = ap_invoice_entity_1.InvoiceStatus.APPROVED;
        invoice.approvedById = userId;
        invoice.approvedAt = new Date();
        return this.invoiceRepository.save(invoice);
    }
    async createPayment(dto) {
        const invoice = await this.findInvoice(dto.invoiceId);
        if (invoice.status === ap_invoice_entity_1.InvoiceStatus.PAID) {
            throw new common_1.BadRequestException('Invoice is already paid');
        }
        if (dto.amount > invoice.outstandingAmount) {
            throw new common_1.BadRequestException('Payment amount exceeds outstanding balance');
        }
        const payment = this.paymentRepository.create({
            ...dto,
            paymentDate: dto.paymentDate,
        });
        await this.paymentRepository.save(payment);
        const newPaid = Number(invoice.paidAmount) + dto.amount;
        const newOutstanding = Number(invoice.outstandingAmount) - dto.amount;
        const newStatus = newOutstanding <= 0 ? ap_invoice_entity_1.InvoiceStatus.PAID : invoice.status;
        await this.invoiceRepository.update(dto.invoiceId, {
            paidAmount: newPaid,
            outstandingAmount: newOutstanding,
            status: newStatus,
        });
        await this.vendorRepository.update(invoice.vendorId, {
            outstandingBalance: () => `outstanding_balance - ${dto.amount}`,
        });
        return payment;
    }
    async getAgingReport() {
        const invoices = await this.invoiceRepository.find({
            where: { status: ap_invoice_entity_1.InvoiceStatus.APPROVED },
            relations: ['vendor'],
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
exports.APService = APService;
exports.APService = APService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(1, (0, typeorm_1.InjectRepository)(ap_invoice_entity_1.APInvoice)),
    __param(2, (0, typeorm_1.InjectRepository)(ap_payment_entity_1.APPayment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], APService);
//# sourceMappingURL=ap.service.js.map