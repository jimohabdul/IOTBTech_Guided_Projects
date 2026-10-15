"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedAssetModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fixed_asset_entity_1 = require("./entities/fixed-asset.entity");
const fixed_asset_service_1 = require("./services/fixed-asset.service");
const fixed_asset_controller_1 = require("./controllers/fixed-asset.controller");
let FixedAssetModule = class FixedAssetModule {
};
exports.FixedAssetModule = FixedAssetModule;
exports.FixedAssetModule = FixedAssetModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([fixed_asset_entity_1.FixedAsset])],
        controllers: [fixed_asset_controller_1.FixedAssetController],
        providers: [fixed_asset_service_1.FixedAssetService],
        exports: [fixed_asset_service_1.FixedAssetService],
    })
], FixedAssetModule);
//# sourceMappingURL=fixed-asset.module.js.map