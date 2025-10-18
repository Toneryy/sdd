"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Subscription.ts
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const UserSubscription_1 = __importDefault(require("./UserSubscription"));
class Subscription extends objection_1.Model {
}
Subscription.tableName = "subscriptions";
Subscription.idColumn = "id";
Subscription.jsonSchema = {
    type: "object",
    required: ["title", "duration_days", "price"],
    properties: {
        id: { type: "integer" },
        title: { type: "string", maxLength: 50 },
        duration_days: { type: "integer" },
        price: { type: "string", pattern: "^\\d+(\\.\\d{1,2})?$" },
    },
};
Subscription.relationMappings = {
    users: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: User_1.default,
        join: {
            from: "subscriptions.id",
            to: "users.subscription_id",
        },
    },
    history: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: UserSubscription_1.default,
        join: {
            from: "subscriptions.id",
            to: "user_subscriptions.subscription_id",
        },
    },
};
exports.default = Subscription;
