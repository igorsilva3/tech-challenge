import { User, Account } from '@prisma/client'
import { View } from '@views/View'

type IUserWithAccount = User & {
  account: Account
} 

interface IUserViewProps {
  id: string
  username: string
  account: Account
  createdAt: Date
  updatedAt: Date
}

export class UserView extends View<IUserViewProps> {
  public render(item: IUserWithAccount): IUserViewProps {
    return {
      id: item.id,
      username: item.username,
      account: item.account,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  }
}