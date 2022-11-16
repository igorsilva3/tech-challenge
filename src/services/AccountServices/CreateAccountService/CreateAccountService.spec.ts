import { CreateAccountService } from '@services/AccountServices/CreateAccountService'

const createAccountService = new CreateAccountService()

describe('Create Account Service',  () => {
  it('should to be able create a account', async () => {
    const account = await createAccountService.execute()

    expect(account).toHaveProperty('id')
    expect(Number(account.balance)).toEqual(100)
  })

  it('should to be able create a account with balance of 50', async () => {
    const account = await createAccountService.execute({
      data: {
        balance: 50
      }
    })

    expect(account).toHaveProperty('id')
    expect(Number(account.balance)).toEqual(50)
  })
})