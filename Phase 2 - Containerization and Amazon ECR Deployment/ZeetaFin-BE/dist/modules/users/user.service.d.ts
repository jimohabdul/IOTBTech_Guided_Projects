import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    createUser(data: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: string, data: Partial<User>): Promise<User>;
}
