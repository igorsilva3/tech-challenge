import { Router } from 'express'

import { UserController  } from '@controllers/UserController'

import { auth } from '@middlewares/auth'

import { accountRouter } from '@routes/accountRoutes'
import { transactionRouter } from '@routes/transactionRoutes'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)

userRouter.use(auth)

userRouter.use('/account', accountRouter)
userRouter.use('/transaction', transactionRouter)

export { userRouter }