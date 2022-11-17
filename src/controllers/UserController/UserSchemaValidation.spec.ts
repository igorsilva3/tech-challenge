import { faker } from '@faker-js/faker'

import { userSchemaValidation } from './UserSchemaValidation'

describe('User schema validation', () => {
  it('should to be able validate user data', async () => {
    const data = {
      username: faker.internet.userName(),
      password: "passWord8"
    }

    const validation = await userSchemaValidation.isValid(data)

    expect(validation).toBeTruthy()
  })
})