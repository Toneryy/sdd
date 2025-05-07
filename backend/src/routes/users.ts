// src/routes/users.ts
import userController from '../controllers/userController'
import { Router } from 'express'
const router = Router()

router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
