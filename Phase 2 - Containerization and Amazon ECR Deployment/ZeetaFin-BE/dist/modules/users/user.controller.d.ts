import { UserService } from './user.service';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    create(data: Partial<User>): Promise<User>;
}
