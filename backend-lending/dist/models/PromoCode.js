"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/PromoCode.ts
const objection_1 = require("objection");
const PromoUsage_1 = __importDefault(require("./PromoUsage"));
class PromoCode extends objection_1.Model {
}
PromoCode.tableName = "promocodes";
PromoCode.idColumn = "id";
PromoCode.jsonSchema = {
    type: "object",
    required: ["code", "discount", "min_subscription_months", "expires_at"],
    properties: {
        id: { type: "integer" },
        code: { type: "string", maxLength: 50 },
        discount: { type: "integer" },
        min_subscription_months: { type: "integer" },
        expires_at: { type: "string", format: "date-time" },
    },
};
PromoCode.relationMappings = {
    usage: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: PromoUsage_1.default,
        join: {
            from: "promocodes.id",
            to: "promo_usage.promocode_id",
        },
    },
};
exports.default = PromoCode;
