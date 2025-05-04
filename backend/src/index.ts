import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import profileRoutes from './routes/profile.routes'
import subscriptionRoutes from './routes/subscriptions.routes'
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes)
app.use('/api/subscriptions', subscriptionRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
