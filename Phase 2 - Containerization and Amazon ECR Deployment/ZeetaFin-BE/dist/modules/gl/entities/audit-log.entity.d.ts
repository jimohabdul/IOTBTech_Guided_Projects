export declare class AuditLog {
    id: string;
    userId: string;
    action: string;
    entity: string;
    entityId: string;
    changes: any;
    ipAddress: string;
    createdAt: Date;
}
