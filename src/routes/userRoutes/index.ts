import { Router } from 'express'

import { UserController  } from '@controllers/UserController'

import { auth } from '@middlewares/auth'

import { accountRouter } from '@routes/accountRoutes'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)

userRouter.use(auth)

userRouter.use('/account', accountRouter)

export { userRouter }