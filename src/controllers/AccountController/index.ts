import { Request, Response } from 'express'

import { AccountServices } from '@services/AccountServices'
import { GetUserService } from '@services/UserServices/GetUserService'

const accountServices = new AccountServices()
const getUserService = new GetUserService()

export class AccountController {
  async show(req: Request, res: Response) {
    try {
      const { userId } = req.body

      const user = await getUserService.execute({
        where: {
          id: userId
        }
      })

      const account = await accountServices.getAccountService.execute({
        where: {
          id: user.accountId
        }
      })

      return res.status(200).json(account)
      
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  } 
}