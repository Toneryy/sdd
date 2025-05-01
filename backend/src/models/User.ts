// src/models/User.ts
import { Model, RelationMappings } from "objection";
import Subscription from "./Subscription";
import UserSubscription from "./UserSubscription";
import PromoUsage from "./PromoUsage";
import SupportRequest from "./SupportRequest";
import ServiceOrder from "./ServiceOrder";

export default class User extends Model {
  // теперь id — строка UUID
  id!: string;
  username!: string;
  email!: string;
  phone?: string | null;
  password!: string;
  subscription_id!: number | null;
  created_at!: string;

  static tableName = "users";
  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
      id: { type: "string", format: "uuid" },
      username: { type: "string", maxLength: 50 },
      email: { type: "string", maxLength: 100 },
      phone: { type: ["string", "null"], maxLength: 20 },
      password: { type: "string" },
      subscription_id: { type: ["integer", "null"] },
      created_at: { type: "string", format: "date-time" },
    },
  };

  static relationMappings: RelationMappings = {
    subscription: {
      relation: Model.BelongsToOneRelation,
      modelClass: Subscription,
      join: {
        from: "users.subscription_id",
        to: "subscriptions.id",
      },
    },
    subscriptionsHistory: {
      relation: Model.HasManyRelation,
      modelClass: UserSubscription,
      join: {
        from: "users.id",
        to: "user_subscriptions.user_id",
      },
    },
    promoUsage: {
      relation: Model.HasManyRelation,
      modelClass: PromoUsage,
      join: {
        from: "users.id",
        to: "promo_usage.user_id",
      },
    },
    supportRequests: {
      relation: Model.HasManyRelation,
      modelClass: SupportRequest,
      join: {
        from: "users.id",
        to: "support_requests.user_id",
      },
    },
    serviceOrders: {
      relation: Model.HasManyRelation,
      modelClass: ServiceOrder,
      join: {
        from: "users.id",
        to: "service_orders.user_id",
      },
    },
  };
}
