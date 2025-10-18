"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/News.ts
const objection_1 = require("objection");
class News extends objection_1.Model {
}
News.tableName = "news";
News.idColumn = "id";
News.jsonSchema = {
    type: "object",
    required: ["title"],
    properties: {
        id: { type: "integer" },
        title: { type: "string", maxLength: 255 },
        body: { type: ["string", "null"] },
        created_at: { type: "string", format: "date-time" },
    },
};
exports.default = News;
