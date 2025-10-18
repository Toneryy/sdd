// src/models/PromoUsage.ts
import { Model, RelationMappings } from "objection";
import User from "./User";
import PromoCode from "./PromoCode";

export default class PromoUsage extends Model {
  id!: number;
  user_id!: number;
  promocode_id!: number;
  used_at!: string;

  static tableName = "promo_usage";
  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["user_id", "promocode_id"],
    properties: {
      id: { type: "integer" },
      user_id: { type: "integer" },
      promocode_id: { type: "integer" },
      used_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "promo_usage.user_id",
        to: "users.id",
      },
    },
    promocode: {
      relation: Model.BelongsToOneRelation,
      modelClass: PromoCode,
      join: {
        from: "promo_usage.promocode_id",
        to: "promocodes.id",
      },
    },
  };
}
