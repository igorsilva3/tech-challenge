import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

interface IGetUserServiceDTO {
  where: {
    id: string
  }
}

interface IGetUserService {
  execute(data: IGetUserServiceDTO): Promise<User | null>
}

export class GetUserService implements IGetUserService {
  async execute(data: IGetUserServiceDTO): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: data.where.id
      }
    })

    return user
  }
}
