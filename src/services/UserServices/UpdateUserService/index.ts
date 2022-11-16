import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

interface IUpdateUserServiceDTO {
  id: string,
  data: {
    username?: string,
    password?: string,
  }
}

interface IUpdateUserService {
  execute(data: IUpdateUserServiceDTO): Promise<User>
}

export class UpdateUserService implements IUpdateUserService {
  async execute(data: IUpdateUserServiceDTO): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        ...data.data,
        updatedAt: new Date()
      }
    })

    return user
  }
}