// src/models/UserSubscription.ts
import { Model, RelationMappings } from "objection";
import User from "./User";
import Subscription from "./Subscription";

export default class UserSubscription extends Model {
  id!: number;
  user_id!: number;
  subscription_id!: number;
  start_date!: string;
  end_date!: string;
  active!: boolean;

  static tableName = "user_subscriptions";
  static idColumn = "id";

  static jsonSchema = {
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

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "user_subscriptions.user_id",
        to: "users.id",
      },
    },
    subscription: {
      relation: Model.BelongsToOneRelation,
      modelClass: Subscription,
      join: {
        from: "user_subscriptions.subscription_id",
        to: "subscriptions.id",
      },
    },
  };
}
