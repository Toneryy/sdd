"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const objection_1 = require("objection");
const Subscription_1 = __importDefault(require("./Subscription"));
const UserSubscription_1 = __importDefault(require("./UserSubscription"));
const PromoUsage_1 = __importDefault(require("./PromoUsage"));
const SupportRequest_1 = __importDefault(require("./SupportRequest"));
const ServiceOrder_1 = __importDefault(require("./ServiceOrder"));
class User extends objection_1.Model {
}
User.tableName = "users";
User.idColumn = "id";
User.jsonSchema = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
        id: { type: "string", format: "uuid" },
        username: { type: "string", maxLength: 50 },
        email: { type: "string", maxLength: 100 },
        phone: { type: ["string", "null"], maxLength: 20 },
        password: { type: "string" },
        subscription_id: { type: ["integer", "null"] },
        created_at: { type: "string", format: "date-time" },
    },
};
User.relationMappings = {
    subscription: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Subscription_1.default,
        join: {
            from: "users.subscription_id",
            to: "subscriptions.id",
        },
    },
    subscriptionsHistory: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: UserSubscription_1.default,
        join: {
            from: "users.id",
            to: "user_subscriptions.user_id",
        },
    },
    promoUsage: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: PromoUsage_1.default,
        join: {
            from: "users.id",
            to: "promo_usage.user_id",
        },
    },
    supportRequests: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: SupportRequest_1.default,
        join: {
            from: "users.id",
            to: "support_requests.user_id",
        },
    },
    serviceOrders: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: ServiceOrder_1.default,
        join: {
            from: "users.id",
            to: "service_orders.user_id",
        },
    },
};
exports.default = User;
