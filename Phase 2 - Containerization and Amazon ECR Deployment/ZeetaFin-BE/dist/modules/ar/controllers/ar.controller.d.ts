import { ARService } from '../services/ar.service';
import { CreateCustomerDto, CreateARInvoiceDto, CreateReceiptDto, CreateCreditNoteDto } from '../dto/ar.dto';
export declare class ARController {
    private arService;
    constructor(arService: ARService);
    findAllCustomers(): Promise<import("../entities/customer.entity").Customer[]>;
    findCustomer(id: string): Promise<import("../entities/customer.entity").Customer>;
    createCustomer(dto: CreateCustomerDto): Promise<import("../entities/customer.entity").Customer>;
    findAllInvoices(status?: string): Promise<import("../entities/ar-invoice.entity").ARInvoice[]>;
    findInvoice(id: string): Promise<import("../entities/ar-invoice.entity").ARInvoice>;
    createInvoice(dto: CreateARInvoiceDto): Promise<import("../entities/ar-invoice.entity").ARInvoice>;
    createReceipt(dto: CreateReceiptDto): Promise<import("../entities/ar-invoice.entity").ARReceipt>;
    createCreditNote(dto: CreateCreditNoteDto): Promise<import("../entities/ar-invoice.entity").ARCreditNote>;
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
