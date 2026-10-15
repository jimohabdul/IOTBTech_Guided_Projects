import { Repository } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { APInvoice } from '../entities/ap-invoice.entity';
import { APPayment } from '../entities/ap-payment.entity';
import { CreateVendorDto, CreateAPInvoiceDto, CreateAPPaymentDto } from '../dto/ap.dto';
export declare class APService {
    private vendorRepository;
    private invoiceRepository;
    private paymentRepository;
    constructor(vendorRepository: Repository<Vendor>, invoiceRepository: Repository<APInvoice>, paymentRepository: Repository<APPayment>);
    findAllVendors(): Promise<Vendor[]>;
    findVendor(id: string): Promise<Vendor>;
    createVendor(dto: CreateVendorDto): Promise<Vendor>;
    findAllInvoices(status?: string): Promise<APInvoice[]>;
    findInvoice(id: string): Promise<APInvoice>;
    createInvoice(dto: CreateAPInvoiceDto): Promise<APInvoice>;
    approveInvoice(id: string, userId: string): Promise<APInvoice>;
    createPayment(dto: CreateAPPaymentDto): Promise<APPayment>;
    getAgingReport(): Promise<{
        buckets: {
            '0-30': number;
            '31-60': number;
            '61-90': number;
            '90+': number;
        };
        details: any[];
        totalOutstanding: number;
    }>;
}
