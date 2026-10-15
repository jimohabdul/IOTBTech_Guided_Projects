"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    secret: process.env.JWT_SECRET || 'zeetafin-secret-key-change-in-production',
    signOptions: { expiresIn: '8h' },
};
//# sourceMappingURL=jwt.config.js.map