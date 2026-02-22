// src/models/PromoCode.ts
import { Model, RelationMappings } from "objection";
import PromoUsage from "./PromoUsage";

export default class PromoCode extends Model {
  id!: number;
  code!: string;
  discount!: number;
  min_subscription_months!: number;
  expires_at!: string;

  static tableName = "promocodes";
  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["code", "discount", "min_subscription_months", "expires_at"],
    properties: {
      id: { type: "integer" },
      code: { type: "string", maxLength: 50 },
      discount: { type: "integer" },
      min_subscription_months: { type: "integer" },
      expires_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    usage: {
      relation: Model.HasManyRelation,
      modelClass: PromoUsage,
      join: {
        from: "promocodes.id",
        to: "promo_usage.promocode_id",
      },
    },
  };
}
