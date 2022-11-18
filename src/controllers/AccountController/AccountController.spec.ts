import { agent  } from 'supertest'
import { faker } from '@faker-js/faker'
import { App } from '@app'

const app = new App().core

const request = agent(app)

const user = {
  username: faker.internet.userName(),
  password: 'account05Add'
}

beforeAll(async () => {
  await request.post('/users').send(user)

  const { body } = await request.post('/auth').send(user)

  request.set({ authorization: `Bearer ${body.token}` })
})

describe('Account controller', () => {
  it('should to be able get the account balance a user', async () => {
    const { statusCode, body } = await request.get('/users/account')

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('balance')
  })
})