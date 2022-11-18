import { Account, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetUserServiceDTO {
  where: {
    id?: string,
    username?: string
  }
}

interface IGetUserService {
  execute(data: IGetUserServiceDTO): Promise<User>
}

export class GetUserService implements IGetUserService {
  async execute(data: IGetUserServiceDTO): Promise<User & { account: Account }> {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: data.where.id,
        username: data.where.username
      },
      include: {
        account: true
      }
    })

    return user
  }
}
