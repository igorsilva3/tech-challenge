import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'
import { GetTransactionService } from '@services/TransactionServices/GetTransactionService'
import { GetAllTransactionsService } from '@services/TransactionServices/GetAllTransactionsService'

interface ITransactionServices {
  createTransactionService: CreateTransactionService
  getTransactionService: GetTransactionService
  getAllTransactionsService: GetAllTransactionsService
}

export class TransactionServices implements ITransactionServices {
  createTransactionService: CreateTransactionService
  getTransactionService: GetTransactionService
  getAllTransactionsService: GetAllTransactionsService

  constructor () {
    this.createTransactionService = new CreateTransactionService()
    this.getTransactionService = new GetTransactionService()
    this.getAllTransactionsService = new GetAllTransactionsService()
  }
}
