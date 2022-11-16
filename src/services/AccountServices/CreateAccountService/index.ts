import { PrismaClient, Account } from '@prisma/client'

const prisma = new PrismaClient()

interface ICreateAccountServiceDTO {
  data: {
    balance: number
  }
}

interface ICreateAccountService {
  execute(data?: ICreateAccountServiceDTO): Promise<Account>
}

export class CreateAccountService implements ICreateAccountService {
  async execute(data?: ICreateAccountServiceDTO): Promise<Account> {
    const account = await prisma.account.create({
      data: {
        balance: data?.data.balance,
      },
    })

    return account
  }
}
