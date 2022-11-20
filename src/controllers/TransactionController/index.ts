import { Request, Response } from 'express'
import { ValidationError } from 'yup'

import { TransactionServices } from '@services/TransactionServices'
import { GetUserService } from '@services/UserServices/GetUserService'

import {
  transactionSchemaValidation,
  transactionSchemaQueryParamsValidation,
} from './TransactionSchemaValidation'

const transactionServices = new TransactionServices()
const getUserService = new GetUserService()

export class TransactionController {
  async create(req: Request, res: Response) {
    try {
      const { userId, username, value } = req.body

      const data = {
        username,
        value,
      }

      await transactionSchemaValidation.validate(data, {
        abortEarly: false,
      })

      /* Getting the user's account balance. */
      const debitUserAccountBalance = await getUserService.execute({
        where: {
          id: userId,
        },
      })

      const creditUserAccountBalance = await getUserService.execute({
        where: {
          username: data.username,
        },
      })

      if (username === debitUserAccountBalance.username)
        throw new Error('User cannot perform the transaction to himself')

      const transaction = await transactionServices.createTransactionService.execute(
        {
          accounts: {
            debitedAccountId: debitUserAccountBalance.accountId,
            creditedAccountId: creditUserAccountBalance.accountId,
          },
          value: data.value,
        },
      )

      return res.status(201).json(transaction)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { userId } = req.body
      const { cashIn, cashOut, createdAt, filter } = req.query

      const queryParams = {
        cashIn,
        cashOut,
        createdAt,
        filter
      }

      await transactionSchemaQueryParamsValidation.validate(queryParams, {
        abortEarly: false,
      })

      const { accountId } = await getUserService.execute({
        where: {
          id: userId,
        }
      })

      const transactions = await transactionServices.getAllTransactionsService.execute(
        {
          where: {
            accountId,
          },
          select: {
            transactionsCreditedAccount: queryParams.cashIn ? Boolean(queryParams.cashIn) : undefined,
            transactionsDebitedAccount: queryParams.cashOut ? Boolean(queryParams.cashOut) : undefined,
            createdAt: queryParams.createdAt ? new Date(String(queryParams.createdAt)) : undefined
          },
          filter: Number(queryParams.filter)
        },
      )

      return res.status(200).json(transactions)
    } catch (error: any) {
      return res.status(400).json(
        error instanceof ValidationError
          ? {
              type: 'validation',
              message: error.message,
              errors: error.errors,
            }
          : { message: error.message },
      )
    }
  }
}
