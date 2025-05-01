import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
