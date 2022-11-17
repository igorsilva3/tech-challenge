import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

interface ICreateUserServiceDTO {
  data: {
    username: string,
    password: string,
    account?: {
      balance: number
    }
  }
}

interface ICreateUserService {
  execute({ data }: ICreateUserServiceDTO): Promise<User>
}

export class CreateUserService implements ICreateUserService {
  async execute({ data }: ICreateUserServiceDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        account: {
          create: {
            balance: data.account?.balance || 100
          }
        }
      },
      include: {
        account: true
      }
    })

    return user
  }
}
