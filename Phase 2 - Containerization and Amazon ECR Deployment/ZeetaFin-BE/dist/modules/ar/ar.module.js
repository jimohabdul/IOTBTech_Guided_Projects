"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const ar_invoice_entity_1 = require("./entities/ar-invoice.entity");
const ar_service_1 = require("./services/ar.service");
const ar_controller_1 = require("./controllers/ar.controller");
let ARModule = class ARModule {
};
exports.ARModule = ARModule;
exports.ARModule = ARModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer, ar_invoice_entity_1.ARInvoice, ar_invoice_entity_1.ARReceipt, ar_invoice_entity_1.ARCreditNote])],
        controllers: [ar_controller_1.ARController],
        providers: [ar_service_1.ARService],
        exports: [ar_service_1.ARService],
    })
], ARModule);
//# sourceMappingURL=ar.module.js.map