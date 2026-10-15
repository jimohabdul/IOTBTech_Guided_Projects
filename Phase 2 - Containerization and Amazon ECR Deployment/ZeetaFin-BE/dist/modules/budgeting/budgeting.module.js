"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const budget_entity_1 = require("./entities/budget.entity");
const chart_of_account_entity_1 = require("../gl/entities/chart-of-account.entity");
const budget_service_1 = require("./services/budget.service");
const budget_controller_1 = require("./controllers/budget.controller");
let BudgetingModule = class BudgetingModule {
};
exports.BudgetingModule = BudgetingModule;
exports.BudgetingModule = BudgetingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([budget_entity_1.Budget, budget_entity_1.BudgetLine, chart_of_account_entity_1.ChartOfAccount])],
        controllers: [budget_controller_1.BudgetController],
        providers: [budget_service_1.BudgetService],
        exports: [budget_service_1.BudgetService],
    })
], BudgetingModule);
//# sourceMappingURL=budgeting.module.js.map