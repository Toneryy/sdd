"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/SupportRequest.ts
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
class SupportRequest extends objection_1.Model {
}
SupportRequest.tableName = "support_requests";
SupportRequest.idColumn = "id";
SupportRequest.jsonSchema = {
    type: "object",
    required: ["user_id", "title"],
    properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        title: { type: "string", maxLength: 255 },
        description: { type: ["string", "null"] },
        status: { type: "string", maxLength: 20 },
        created_at: { type: "string", format: "date-time" },
    },
};
SupportRequest.relationMappings = {
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_1.default,
        join: {
            from: "support_requests.user_id",
            to: "users.id",
        },
    },
};
exports.default = SupportRequest;
