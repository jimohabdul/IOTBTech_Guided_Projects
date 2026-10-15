import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { ARInvoice, ARReceipt, ARCreditNote } from '../entities/ar-invoice.entity';
import { CreateCustomerDto, CreateARInvoiceDto, CreateReceiptDto, CreateCreditNoteDto } from '../dto/ar.dto';
export declare class ARService {
    private customerRepository;
    private invoiceRepository;
    private receiptRepository;
    private creditNoteRepository;
    constructor(customerRepository: Repository<Customer>, invoiceRepository: Repository<ARInvoice>, receiptRepository: Repository<ARReceipt>, creditNoteRepository: Repository<ARCreditNote>);
    findAllCustomers(): Promise<Customer[]>;
    findCustomer(id: string): Promise<Customer>;
    createCustomer(dto: CreateCustomerDto): Promise<Customer>;
    findAllInvoices(status?: string): Promise<ARInvoice[]>;
    findInvoice(id: string): Promise<ARInvoice>;
    createInvoice(dto: CreateARInvoiceDto): Promise<ARInvoice>;
    createReceipt(dto: CreateReceiptDto): Promise<ARReceipt>;
    createCreditNote(dto: CreateCreditNoteDto): Promise<ARCreditNote>;
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
