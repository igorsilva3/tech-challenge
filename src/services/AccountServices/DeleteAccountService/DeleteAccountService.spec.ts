import { CreateAccountService } from '@services/AccountServices/CreateAccountService'
import { DeleteAccountService } from '@services/AccountServices/DeleteAccountService'


let id: string

const deleteAccountService = new DeleteAccountService()

beforeAll(async () => {
  const createAccountService = new CreateAccountService()

  const account = await createAccountService.execute()

  id = account.id
})

describe('Delete Account Service',  () => {
  it('should to be able delete a account by id', async () => {
    const account = await deleteAccountService.execute({
      where: {
        id
      }
    })

    expect(account).toHaveProperty('id')
    expect(account?.id).toEqual(id)
    expect(Number(account?.balance)).toEqual(100)
  })
})