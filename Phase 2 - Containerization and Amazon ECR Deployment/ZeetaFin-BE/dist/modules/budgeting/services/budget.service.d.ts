import { Repository } from 'typeorm';
import { Budget, BudgetLine } from '../entities/budget.entity';
import { ChartOfAccount } from '../../gl/entities/chart-of-account.entity';
import { CreateBudgetDto } from '../dto/budget.dto';
export declare class BudgetService {
    private budgetRepository;
    private budgetLineRepository;
    private accountRepository;
    constructor(budgetRepository: Repository<Budget>, budgetLineRepository: Repository<BudgetLine>, accountRepository: Repository<ChartOfAccount>);
    findAll(): Promise<Budget[]>;
    findOne(id: string): Promise<Budget>;
    create(dto: CreateBudgetDto): Promise<Budget>;
    approve(id: string, userId: string): Promise<Budget>;
    getVarianceReport(budgetId: string): Promise<{
        budget: Budget;
        lines: BudgetLine[];
        summary: {
            totalPlanned: number;
            totalActual: number;
            totalVariance: number;
            variancePercentage: number;
        };
    }>;
}
