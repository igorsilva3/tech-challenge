import { faker } from '@faker-js/faker'

import { transactionSchemaValidation } from './TransactionSchemaValidation'

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
})