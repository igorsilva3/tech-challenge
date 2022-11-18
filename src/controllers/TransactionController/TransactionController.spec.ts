import { agent  } from 'supertest'
import { faker } from '@faker-js/faker'
import { App } from '@app'

const app = new App().core

const request = agent(app)

const userOne = {
  username: faker.internet.userName(),
  password: 'account05Add',
  token: ''
}

const userTwo = {
  username: faker.internet.userName(),
  password: 'account06Add',
  token: ''
}

beforeAll(async () => {
  await request.post('/users').send({
    username: userOne.username,
    password: userOne.password
  })

  await request.post('/users').send({
    username: userTwo.username,
    password: userTwo.password
  })

  /* Getting the token of users. */
  const responseUserOne = await request.post('/auth').send({
    username: userOne.username,
    password: userOne.password
  })

  const responseUserTwo = await request.post('/auth').send({
    username: userTwo.username,
    password: userTwo.password
  })

  /* Setting the token of the users. */
  userOne.token = responseUserOne.body.token
  userTwo.token = responseUserTwo.body.token

  /* Setting the authorization header to the request object. */
  request.set({ authorization: `Bearer ${userOne.token}` })
})

describe('Transaction controller', () => {
  it('should to be able a transaction of userOne to userTwo', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
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

  it.skip('not should to be able a transaction of userOne to userTwo with not enough balance', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
      username: userTwo.username,
      value: 200
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('Do not have enough balance')
  })

  it.skip('not should to be able a transaction of userOne to userTwo with unauthorized amount', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
      username: userTwo.username,
      value: -10
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('value must be greater than or equal to 0.1')
  })

  it.skip('not should to be able a transaction of userOne to userOne', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
      username: userOne.username,
      value: 10
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('User cannot perform the transaction to himself')
  })

  it('should to be able get cash-out transactions of a user', async () => {
    request.set({ authorization: `Bearer ${userTwo.token}` })

    const { statusCode, body } = await request.get('/users/account/transactions/cash-out')

    expect(statusCode).toBe(200)
    expect(body.length > 0).toBe(true)
  })

  it('should to be able get cash-in transactions of a user', async () => {
    request.set({ authorization: `Bearer ${userOne.token}` })

    const { statusCode, body } = await request.get('/users/account/transactions/cash-in')

    expect(statusCode).toBe(200)
    expect(body.length > 0).toBe(true)
  })
})

