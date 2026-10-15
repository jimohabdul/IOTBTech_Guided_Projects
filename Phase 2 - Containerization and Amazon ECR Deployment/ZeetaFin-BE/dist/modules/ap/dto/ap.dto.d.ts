export declare class CreateVendorDto {
    vendorCode: string;
    name: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    taxId?: string;
}
export declare class CreateAPInvoiceDto {
    invoiceNumber: string;
    vendorId: string;
    invoiceDate: string;
    dueDate: string;
    amount: number;
    description?: string;
}
export declare class CreateAPPaymentDto {
    invoiceId: string;
    paymentDate: string;
    amount: number;
    referenceNumber?: string;
    notes?: string;
}
