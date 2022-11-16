import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

interface IDeleteAccountServiceDTO {
  where: {
    id: string
  }
}

interface IDeleteUserService {
  execute(data: IDeleteAccountServiceDTO): Promise<User>
}

export class DeleteUserService implements IDeleteUserService {
  async execute(data: IDeleteAccountServiceDTO): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id: data.where.id,
      },
    })

    return user
  }
}
