"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chart_of_account_entity_1 = require("./entities/chart-of-account.entity");
const journal_entry_entity_1 = require("./entities/journal-entry.entity");
const audit_log_entity_1 = require("./entities/audit-log.entity");
const chart_of_accounts_service_1 = require("./services/chart-of-accounts.service");
const journal_entries_service_1 = require("./services/journal-entries.service");
const gl_controller_1 = require("./controllers/gl.controller");
let GLModule = class GLModule {
};
exports.GLModule = GLModule;
exports.GLModule = GLModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chart_of_account_entity_1.ChartOfAccount, journal_entry_entity_1.JournalEntry, journal_entry_entity_1.JournalEntryLine, audit_log_entity_1.AuditLog])],
        controllers: [gl_controller_1.GLController],
        providers: [chart_of_accounts_service_1.ChartOfAccountsService, journal_entries_service_1.JournalEntriesService],
        exports: [chart_of_accounts_service_1.ChartOfAccountsService, journal_entries_service_1.JournalEntriesService],
    })
], GLModule);
//# sourceMappingURL=gl.module.js.map