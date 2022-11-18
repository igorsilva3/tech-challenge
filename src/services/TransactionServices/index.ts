import { CreateTransactionService } from '@services/TransactionServices/CreateTransactionService'
import { GetTransactionService } from '@services/TransactionServices/GetTransactionService'
import { GetCashOutTransactionsService } from '@services/TransactionServices/GetCashOutTransactions'
import { GetCashInTransactionsService } from '@services/TransactionServices/GetCashInTransactions'

interface ITransactionServices {
  createTransactionService: CreateTransactionService
  getTransactionService: GetTransactionService
  getCashOutTransactionsService: GetCashOutTransactionsService
  getCashInTransactionsService: GetCashInTransactionsService
}

export class TransactionServices implements ITransactionServices {
  createTransactionService: CreateTransactionService
  getTransactionService: GetTransactionService
  getCashInTransactionsService: GetCashInTransactionsService
  getCashOutTransactionsService: GetCashOutTransactionsService


  constructor () {
    this.createTransactionService = new CreateTransactionService()
    this.getTransactionService = new GetTransactionService()
    this.getCashOutTransactionsService = new GetCashOutTransactionsService()
    this.getCashInTransactionsService = new GetCashInTransactionsService()
  }
}
