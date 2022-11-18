import { Router } from 'express'

import { TransactionController  } from '@controllers/TransactionController'

const transactionRouter = Router()
const transactionController = new TransactionController()

transactionRouter.post('/', transactionController.create)
transactionRouter.get('/cash-out', transactionController.showCashOut)
transactionRouter.get('/cash-in', transactionController.showCashIn)

export { transactionRouter }