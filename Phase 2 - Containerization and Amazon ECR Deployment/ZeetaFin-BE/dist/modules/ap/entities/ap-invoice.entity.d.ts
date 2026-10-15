import { Vendor } from './vendor.entity';
export declare enum InvoiceStatus {
    DRAFT = "draft",
    PENDING = "pending",
    APPROVED = "approved",
    PAID = "paid",
    CANCELLED = "cancelled"
}
export declare class APInvoice {
    id: string;
    invoiceNumber: string;
    vendorId: string;
    vendor: Vendor;
    invoiceDate: Date;
    dueDate: Date;
    amount: number;
    paidAmount: number;
    outstandingAmount: number;
    status: InvoiceStatus;
    description: string;
    approvedById: string;
    approvedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
