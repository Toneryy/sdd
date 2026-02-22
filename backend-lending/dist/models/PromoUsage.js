"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/PromoUsage.ts
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const PromoCode_1 = __importDefault(require("./PromoCode"));
class PromoUsage extends objection_1.Model {
}
PromoUsage.tableName = "promo_usage";
PromoUsage.idColumn = "id";
PromoUsage.jsonSchema = {
    type: "object",
    required: ["user_id", "promocode_id"],
    properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        promocode_id: { type: "integer" },
        used_at: { type: "string", format: "date-time" },
    },
};
PromoUsage.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.default,
        join: {
            from: "promo_usage.user_id",
            to: "users.id",
        },
    },
    promocode: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: PromoCode_1.default,
        join: {
            from: "promo_usage.promocode_id",
            to: "promocodes.id",
        },
    },
};
exports.default = PromoUsage;
