// src/models/Subscription.ts
import { Model, RelationMappings } from "objection";
import User from "./User";
import UserSubscription from "./UserSubscription";

export default class Subscription extends Model {
  id!: number;
  title!: string;
  duration_days!: number;
  price!: string;

  static tableName = "subscriptions";
  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["title", "duration_days", "price"],
    properties: {
      id: { type: "integer" },
      title: { type: "string", maxLength: 50 },
      duration_days: { type: "integer" },
      price: { type: "string", pattern: "^\\d+(\\.\\d{1,2})?$" },
    },
  };

  static relationMappings: RelationMappings = {
    users: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: "subscriptions.id",
        to: "users.subscription_id",
      },
    },
    history: {
      relation: Model.HasManyRelation,
      modelClass: UserSubscription,
      join: {
        from: "subscriptions.id",
        to: "user_subscriptions.subscription_id",
      },
    },
  };
}
