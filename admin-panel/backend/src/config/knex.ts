// src/config/knex.ts
import { knex } from "knex";
import { Model } from "objection";
import dotenv from "dotenv";

dotenv.config();

export const knexInstance = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

Model.knex(knexInstance);
