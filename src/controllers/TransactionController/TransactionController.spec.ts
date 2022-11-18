import { agent  } from 'supertest'
import { faker } from '@faker-js/faker'
import { App } from '@app'

const app = new App().core

const request = agent(app)

const userOne = {
  username: faker.internet.userName(),
  password: 'account05Add'
}

const userTwo = {
  username: faker.internet.userName(),
  password: 'account06Add'
}

beforeAll(async () => {
  await request.post('/users').send(userOne)
  await request.post('/users').send(userTwo)

  /* Getting the token of userOne. */
  const { body } = await request.post('/auth').send(userOne)

  /* Setting the authorization header to the request object. */
  request.set({ authorization: `Bearer ${body.token}` })
})

describe('Transaction controller', () => {
  it('should to be able a transaction of userOne to userTwo', async () => {
    const { statusCode, body } = await request.post('/users/transaction').send({
      username: userTwo.username,
      value: faker.datatype.float({
        max: 100
      })
    })

    expect(statusCode).toBe(201)
    expect(body).toHaveProperty('createdAt')
    expect(body).toHaveProperty('debitedAccountId')
    expect(body).toHaveProperty('creditedAccountId')
  })

  it('not should to be able a transaction of userOne to userTwo with not enough balance', async () => {
    const { statusCode, body } = await request.post('/users/transaction').send({
      username: userTwo.username,
      value: 200
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('Do not have enough balance')
  })

  it('not should to be able a transaction of userOne to userTwo with unauthorized amount', async () => {
    const { statusCode, body } = await request.post('/users/transaction').send({
      username: userTwo.username,
      value: -10
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('value must be greater than or equal to 0.1')
  })

  it('not should to be able a transaction of userOne to userOne', async () => {
    const { statusCode, body } = await request.post('/users/transaction').send({
      username: userOne.username,
      value: 10
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('User cannot perform the transaction to himself')
  })
})

