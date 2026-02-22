"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/UserSubscription.ts
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const Subscription_1 = __importDefault(require("./Subscription"));
class UserSubscription extends objection_1.Model {
}
UserSubscription.tableName = "user_subscriptions";
UserSubscription.idColumn = "id";
UserSubscription.jsonSchema = {
    type: "object",
    required: ["user_id", "subscription_id", "start_date", "end_date"],
    properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        subscription_id: { type: "integer" },
        start_date: { type: "string", format: "date" },
        end_date: { type: "string", format: "date" },
        active: { type: "boolean" },
    },
};
UserSubscription.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.default,
        join: {
            from: "user_subscriptions.user_id",
            to: "users.id",
        },
    },
    subscription: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Subscription_1.default,
        join: {
            from: "user_subscriptions.subscription_id",
            to: "subscriptions.id",
        },
    },
};
exports.default = UserSubscription;
