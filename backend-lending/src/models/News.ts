// src/models/News.ts
import { Model } from "objection";

export default class News extends Model {
  id!: number;
  title!: string;
  body?: string;
  created_at!: string;

  static tableName = "news";
  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["title"],
    properties: {
      id: { type: "integer" },
      title: { type: "string", maxLength: 255 },
      body: { type: ["string", "null"] },
      created_at: { type: "string", format: "date-time" },
    },
  };
}
