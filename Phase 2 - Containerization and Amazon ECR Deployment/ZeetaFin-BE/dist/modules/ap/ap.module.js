"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_entity_1 = require("./entities/vendor.entity");
const ap_invoice_entity_1 = require("./entities/ap-invoice.entity");
const ap_payment_entity_1 = require("./entities/ap-payment.entity");
const ap_service_1 = require("./services/ap.service");
const ap_controller_1 = require("./controllers/ap.controller");
let APModule = class APModule {
};
exports.APModule = APModule;
exports.APModule = APModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vendor_entity_1.Vendor, ap_invoice_entity_1.APInvoice, ap_payment_entity_1.APPayment])],
        controllers: [ap_controller_1.APController],
        providers: [ap_service_1.APService],
        exports: [ap_service_1.APService],
    })
], APModule);
//# sourceMappingURL=ap.module.js.map