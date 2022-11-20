import { faker } from '@faker-js/faker'

import { transactionSchemaValidation, transactionSchemaQueryParamsValidation } from './TransactionSchemaValidation'

describe('Transaction schema validation', () => {
  it('should to be able validate transaction data', async () => {
    const data = {
      username: faker.internet.userName(),
      value: 10
    }

    const validation = await transactionSchemaValidation.isValid(data)

    expect(validation).toBeTruthy()
  })

  it('not should to be able validate transaction data with value negative', async () => {
    const data = {
      username: faker.internet.userName(),
      value: -10
    }

    const validation = await transactionSchemaValidation.isValid(data)

    expect(validation).toBeFalsy()
  })

  it('should to be able validate transaction query params: cash-in', async () => {
    const queryParams = {
      cashIn: true
    }

    const validation = await transactionSchemaQueryParamsValidation.isValid(queryParams)

    expect(validation).toBeTruthy()
  })

  it('should to be able validate transaction query params: cash-out', async () => {
    const queryParams = {
      cashOut: true
    }

    const validation = await transactionSchemaQueryParamsValidation.isValid(queryParams)

    expect(validation).toBeTruthy()
  })

  it('should to be able validate transaction query params: created-at', async () => {
    const queryParams = {
      createdAt: new Date()
    }

    const validation = await transactionSchemaQueryParamsValidation.isValid(queryParams)

    expect(validation).toBeTruthy()
  })

  it('should to be able validate transaction query params: filter', async () => {
    const queryParams = {
      filter: 5
    }

    const validation = await transactionSchemaQueryParamsValidation.isValid(queryParams)

    expect(validation).toBeTruthy()
  })
})