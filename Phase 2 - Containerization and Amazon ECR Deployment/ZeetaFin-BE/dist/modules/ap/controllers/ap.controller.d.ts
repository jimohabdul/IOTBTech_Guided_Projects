import { APService } from '../services/ap.service';
import { CreateVendorDto, CreateAPInvoiceDto, CreateAPPaymentDto } from '../dto/ap.dto';
export declare class APController {
    private apService;
    constructor(apService: APService);
    findAllVendors(): Promise<import("../entities/vendor.entity").Vendor[]>;
    findVendor(id: string): Promise<import("../entities/vendor.entity").Vendor>;
    createVendor(dto: CreateVendorDto): Promise<import("../entities/vendor.entity").Vendor>;
    findAllInvoices(status?: string): Promise<import("../entities/ap-invoice.entity").APInvoice[]>;
    findInvoice(id: string): Promise<import("../entities/ap-invoice.entity").APInvoice>;
    createInvoice(dto: CreateAPInvoiceDto): Promise<import("../entities/ap-invoice.entity").APInvoice>;
    approveInvoice(id: string, req: any): Promise<import("../entities/ap-invoice.entity").APInvoice>;
    createPayment(dto: CreateAPPaymentDto): Promise<import("../entities/ap-payment.entity").APPayment>;
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
