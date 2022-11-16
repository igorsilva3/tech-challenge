import { CreateAccountService } from '@services/AccountServices/CreateAccountService'
import { GetAccountService } from '@services/AccountServices/GetAccountService'


let id: string

const getAccountService = new GetAccountService()

beforeAll(async () => {
  const createAccountService = new CreateAccountService()

  const account = await createAccountService.execute()

  id = account.id
})

describe('Get Account Service',  () => {
  it('should to be able get a account by id', async () => {
    const account = await getAccountService.execute({
      where: {
        id
      }
    })

    expect(account).toHaveProperty('id')
    expect(account?.id).toEqual(id)
    expect(Number(account?.balance)).toEqual(100)
  })
})