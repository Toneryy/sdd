"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/ServiceOrder.ts
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
class ServiceOrder extends objection_1.Model {
}
ServiceOrder.tableName = "service_orders";
ServiceOrder.idColumn = "id";
ServiceOrder.jsonSchema = {
    type: "object",
    required: ["user_id", "status"],
    properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        operator_id: { type: ["integer", "null"] },
        service_desc: { type: ["string", "null"] },
        status: { type: "string", maxLength: 20 },
        created_at: { type: "string", format: "date-time" },
    },
};
ServiceOrder.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.default,
        join: {
            from: "service_orders.user_id",
            to: "users.id",
        },
    },
    // операторской модели пока нет; нужна будет - добавим
    // operator: { ... }
};
exports.default = ServiceOrder;
