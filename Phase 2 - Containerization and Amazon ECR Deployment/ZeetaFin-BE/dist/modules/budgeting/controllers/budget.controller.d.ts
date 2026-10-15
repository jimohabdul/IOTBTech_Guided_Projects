import { BudgetService } from '../services/budget.service';
import { CreateBudgetDto } from '../dto/budget.dto';
export declare class BudgetController {
    private budgetService;
    constructor(budgetService: BudgetService);
    findAll(): Promise<import("../entities/budget.entity").Budget[]>;
    findOne(id: string): Promise<import("../entities/budget.entity").Budget>;
    create(dto: CreateBudgetDto): Promise<import("../entities/budget.entity").Budget>;
    approve(id: string, req: any): Promise<import("../entities/budget.entity").Budget>;
    getVarianceReport(budgetId: string): Promise<{
        budget: import("../entities/budget.entity").Budget;
        lines: import("../entities/budget.entity").BudgetLine[];
        summary: {
            totalPlanned: number;
            totalActual: number;
            totalVariance: number;
            variancePercentage: number;
        };
    }>;
}
