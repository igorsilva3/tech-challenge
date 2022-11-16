import { PrismaClient, Account } from '@prisma/client'

const prisma = new PrismaClient()

interface IUpdateAccountServiceDTO {
  id: string,
  data: {
    balance: number
  }
}

interface IUpdateAccountService {
  execute(data: IUpdateAccountServiceDTO): Promise<Account>
}

export class UpdateAccountService implements IUpdateAccountService {
  async execute(data: IUpdateAccountServiceDTO): Promise<Account> {
    const account = await prisma.account.update({
      where: {
        id: data.id
      },
      data: {
        ...data.data
      }
    })

    return account
  }
}
