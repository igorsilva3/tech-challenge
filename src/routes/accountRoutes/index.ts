import { Router } from 'express'

import { AccountController  } from '@controllers/AccountController'
import { transactionRouter } from '@routes/transactionRoutes'


const accountRouter = Router()
const accountController = new AccountController()

accountRouter.get('/', accountController.show)

accountRouter.use('/transactions', transactionRouter)

export { accountRouter }