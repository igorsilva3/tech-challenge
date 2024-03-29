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
  it('should to be able authenticate a user', async () => {
    const { statusCode, body } = await request.post('/auth').send(data)

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty('token')
  })

  it('not should to be able authenticate a user with username or password invalid', async () => {
    const { statusCode, body } = await request.post('/auth').send({
      ...data,
      password: 'passW0rd1'
    })

    expect(statusCode).toBe(401)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('username or password invalid')
  })
})

