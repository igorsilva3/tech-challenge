import { agent  } from 'supertest'
import { faker } from '@faker-js/faker'
import { App } from '@app'

const app = new App().core

const request = agent(app)

describe('User controller', () => {
  it('should to be able create a user', async () => {
    const { statusCode, body } = await request.post('/users').send({
      username: faker.internet.userName(),
      password: 'passW0rd'
    })

    expect(statusCode).toBe(201)
    expect(body).toHaveProperty('username')
    expect(body).not.toHaveProperty('password')
  })
})

