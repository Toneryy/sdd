// src/config/db.ts
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

pool
  .connect()
  .then(() => console.log('📦 Успешное подключение к PostgreSQL'))
  .catch(err => console.error('❌ Ошибка подключения к БД:', err))

export default pool
