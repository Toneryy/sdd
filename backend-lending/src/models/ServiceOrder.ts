// src/models/ServiceOrder.ts
import { Model, RelationMappings } from "objection";
import User from "./User";

export default class ServiceOrder extends Model {
  id!: number;
  user_id!: number;
  operator_id?: number;
  service_desc?: string;
  status!: string;
  created_at!: string;

  static tableName = "service_orders";
  static idColumn = "id";

  static jsonSchema = {
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

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "service_orders.user_id",
        to: "users.id",
      },
    },
    // операторской модели пока нет; нужна будет - добавим
    // operator: { ... }
  };
}
