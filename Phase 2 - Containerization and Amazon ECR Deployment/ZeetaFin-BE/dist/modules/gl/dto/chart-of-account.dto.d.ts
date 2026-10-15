import { AccountType, AccountSubType } from '../entities/chart-of-account.entity';
export declare class CreateAccountDto {
    code: string;
    name: string;
    type: AccountType;
    subType?: AccountSubType;
    parentId?: string;
    description?: string;
    isActive?: boolean;
}
export declare class UpdateAccountDto {
    name?: string;
    type?: AccountType;
    subType?: AccountSubType;
    description?: string;
    isActive?: boolean;
}
