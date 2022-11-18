import { Request, Response } from 'express'

import { TransactionServices } from '@services/TransactionServices'
import { GetUserService } from '@services/UserServices/GetUserService'

import { transactionSchemaValidation } from './TransactionSchemaValidation';

const transactionServices = new TransactionServices()
const getUserService = new GetUserService()

export class TransactionController {
  async create(req: Request, res: Response) {
    try {
      const { userId, username, value } = req.body

      const data = {
        username, 
        value
      }

      await transactionSchemaValidation.validate(data, {
        abortEarly: false
      })

      /* Getting the user's account balance. */
      const debitUserAccountBalance = await getUserService.execute({
        where: {
          id: userId
        }
      })

      const creditUserAccountBalance = await getUserService.execute({
        where: {
          username: data.username
        }
      })

      if (username === debitUserAccountBalance.username) throw new Error('User cannot perform the transaction to himself')

      const transaction = await transactionServices.createTransactionService.execute({
        accounts: {
          debitedAccountId: debitUserAccountBalance.accountId,
          creditedAccountId: creditUserAccountBalance.accountId
        },
        value: data.value
      })

      return res.status(201).json(transaction)
      
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  } 
}