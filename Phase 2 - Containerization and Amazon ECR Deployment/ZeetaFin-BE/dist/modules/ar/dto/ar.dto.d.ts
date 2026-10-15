export declare class CreateCustomerDto {
    customerCode: string;
    name: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
}
export declare class CreateARInvoiceDto {
    invoiceNumber: string;
    customerId: string;
    invoiceDate: string;
    dueDate: string;
    amount: number;
    description?: string;
}
export declare class CreateReceiptDto {
    invoiceId: string;
    receiptDate: string;
    amount: number;
    referenceNumber?: string;
    notes?: string;
}
export declare class CreateCreditNoteDto {
    invoiceId: string;
    creditNoteDate: string;
    amount: number;
    reason?: string;
}
