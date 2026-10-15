import { APInvoice } from './ap-invoice.entity';
export declare class APPayment {
    id: string;
    invoiceId: string;
    invoice: APInvoice;
    paymentDate: Date;
    amount: number;
    referenceNumber: string;
    notes: string;
    createdAt: Date;
}
