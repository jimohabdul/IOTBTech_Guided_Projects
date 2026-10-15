import { Customer } from './customer.entity';
export declare enum ARInvoiceStatus {
    DRAFT = "draft",
    SENT = "sent",
    PARTIAL = "partial",
    PAID = "paid",
    OVERDUE = "overdue",
    CANCELLED = "cancelled"
}
export declare class ARInvoice {
    id: string;
    invoiceNumber: string;
    customerId: string;
    customer: Customer;
    invoiceDate: Date;
    dueDate: Date;
    amount: number;
    paidAmount: number;
    outstandingAmount: number;
    status: ARInvoiceStatus;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ARCreditNote {
    id: string;
    creditNoteNumber: string;
    invoiceId: string;
    invoice: ARInvoice;
    creditNoteDate: Date;
    amount: number;
    reason: string;
    createdAt: Date;
}
export declare class ARReceipt {
    id: string;
    invoiceId: string;
    invoice: ARInvoice;
    receiptDate: Date;
    amount: number;
    referenceNumber: string;
    notes: string;
    createdAt: Date;
}
