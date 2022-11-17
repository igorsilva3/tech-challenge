import { agent  } from 'supertest'
import { faker } from '@faker-js/faker'
import { App } from '@app'

const app = new App().core

const request = agent(app)

const data = {
  username: '',
  password: 'passW0rd'
}

beforeAll(async () => {
  const { body } = await request.post('/users').send({
    username: faker.internet.userName(),
    password: data.password
  })

  data.username = body.username
})

describe('Auth controller', () => {
  it('should to be able authentica a user', async () => {
    const { statusCode, body } = await request.post('/auth').send(data)

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('token')
  })
})

