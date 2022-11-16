import { CreateAccountService } from '@services/AccountServices/CreateAccountService'
import { UpdateAccountService } from '@services/AccountServices/UpdateAccountService'

let id: string

beforeAll(async () => {
  const createAccountService = new CreateAccountService()

  const account = await createAccountService.execute()

  id = account.id
})

const updateAccountService = new UpdateAccountService()

describe('Update Account Service',  () => {
  it('should to be able update balance account to 50', async () => {
    const account = await updateAccountService.execute({
      id,
      data: {
        balance: 50
      }
    })

    expect(account).toHaveProperty('id')
    expect(Number(account.balance)).toEqual(50)
  })
})