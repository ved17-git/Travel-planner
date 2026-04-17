import express from 'express'
import { signIn, register, logout, profile } from '../controllers/userController.js'
import { authMiddleware } from '../middleware.js'

export const userRouter=express.Router()

userRouter.post('/signin', signIn)
userRouter.post('/register', register)
userRouter.post('/logout', authMiddleware, logout)

userRouter.get('/me', authMiddleware, profile)