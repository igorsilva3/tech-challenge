import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'
import { GetTransactionService } from '@services/TransactionServices/GetTransactionService'

interface ITransactionServices {
  createTransactionService: CreateTransactionService
  getTransactionService: GetTransactionService
}

export class TransactionServices implements ITransactionServices {
  createTransactionService: CreateTransactionService
  getTransactionService: GetTransactionService

  constructor () {
    this.createTransactionService = new CreateTransactionService()
    this.getTransactionService = new GetTransactionService()
  }
}
