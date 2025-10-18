"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexInstance = void 0;
// src/config/knex.ts
const knex_1 = require("knex");
const objection_1 = require("objection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.knexInstance = (0, knex_1.knex)({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});
objection_1.Model.knex(exports.knexInstance);
