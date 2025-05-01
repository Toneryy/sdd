// src/models/SupportRequest.ts
import { Model, RelationMappings } from "objection";
import User from "./User";

export default class SupportRequest extends Model {
  id!: number;
  user_id!: number;
  title!: string;
  description?: string;
  status!: string;
  created_at!: string;

  static tableName = "support_requests";
  static idColumn = "id";

  static jsonSchema = {
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

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "support_requests.user_id",
        to: "users.id",
      },
    },
  };
}
