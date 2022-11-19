import { agent  } from 'supertest'
import { faker } from '@faker-js/faker'
import { App } from '@app'

const app = new App().core

const request = agent(app)

const userOne = {
  username: faker.internet.userName(),
  password: 'account05Add',
  token: '',
  accountId: ''
}

const userTwo = {
  username: faker.internet.userName(),
  password: 'account06Add',
  token: '',
  accountId: ''
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

  /* Setting the accountId of the users. */
  userOne.accountId = responseUserOne.body.user.account.id
  userTwo.accountId = responseUserTwo.body.user.account.id

  /* Setting the authorization header to the request object. */
  request.set({ authorization: `Bearer ${userOne.token}` })
})

describe('Transaction controller', () => {
  it('should to be able create a transaction of userOne to userTwo', async () => {
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

  it('not should to be able create a transaction of userOne to userTwo with not enough balance', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
      username: userTwo.username,
      value: 200
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('Do not have enough balance')
  })

  it('not should to be able create a transaction of userOne to userTwo with unauthorized amount', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
      username: userTwo.username,
      value: -10
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('value must be greater than or equal to 0.1')
  })

  it('not should to be able create a transaction of userOne to userOne', async () => {
    const { statusCode, body } = await request.post('/users/account/transactions').send({
      username: userOne.username,
      value: 10
    })

    expect(statusCode).toBe(400)
    expect(body).toHaveProperty('message')
    expect(body.message).toBe('User cannot perform the transaction to himself')
  })

  it('should to be able get all transactions of a user', async () => {
    request.set({ authorization: `Bearer ${userTwo.token}` })

    const { statusCode, body } = await request.get('/users/account/transactions')

    expect(statusCode).toBe(200)
    expect(body.length > 0).toBe(true)
    expect(body[0]).toHaveProperty('createdAt')
  })

  it('should to be able get all transactions of a user filtered by cash-in', async () => {
    request.set({ authorization: `Bearer ${userTwo.token}` })

    const { statusCode, body } = await request.get('/users/account/transactions/?cashIn=true')

    expect(statusCode).toBe(200)
    expect(body.length > 0).toBe(true)
    expect(body[0]).toHaveProperty('createdAt')
    expect(body[0].creditedAccountId).toEqual(userTwo.accountId)
  })

  it('should to be able get all transactions of a user filtered by cash-out', async () => {
    request.set({ authorization: `Bearer ${userOne.token}` })

    const { statusCode, body } = await request.get('/users/account/transactions/?cashOut=true')

    expect(statusCode).toBe(200)
    expect(body.length > 0).toBe(true)
    expect(body[0]).toHaveProperty('createdAt')
    expect(body[0].debitedAccountId).toEqual(userOne.accountId)
  })

  it('should to be able get all transactions of a user filtered by created-at', async () => {
    request.set({ authorization: `Bearer ${userOne.token}` })
    
    /* Getting the current date in the format `YYYY-MM-DD`. */
    const selectDate = new Date().toISOString().slice(0, 10)
    
    const { statusCode, body } = await request.get(`/users/account/transactions/?createdAt=${selectDate}`)

    /* Getting the date of the transaction. */
    const transactionDate = body[0].createdAt.slice(0, 10)

    expect(statusCode).toBe(200)
    expect(body.length > 0).toBe(true)
    expect(body[0]).toHaveProperty('createdAt')
    expect(transactionDate).toEqual(selectDate)
  })
})

