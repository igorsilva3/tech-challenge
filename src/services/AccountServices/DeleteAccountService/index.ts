import { PrismaClient, Account } from '@prisma/client'

const prisma = new PrismaClient()

interface IDeleteAccountServiceDTO {
  where: {
    id: string
  }
}

interface ICreateAccountService {
  execute(data: IDeleteAccountServiceDTO): Promise<Account>
}

export class DeleteAccountService implements ICreateAccountService {
  async execute(data: IDeleteAccountServiceDTO): Promise<Account> {
    const account = await prisma.account.delete({
      where: {
        id: data.where.id
      }
    })

    return account
  }
}
