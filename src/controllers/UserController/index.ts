import { Request, Response } from 'express'
import { hash, genSalt } from 'bcrypt'
import { ValidationError } from 'yup'

import { UserServices } from '@services/UserServices'
import { userSchemaValidation } from './UserSchemaValidation'
import { UserView } from '@views/UserView'

const userServices = new UserServices()
const userView = new UserView()

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body

      const data = {
        username,
        password
      }

      await userSchemaValidation.validate(data, {
        abortEarly: false
      })

      const salt = await genSalt()

      const passwordHash = await hash(password, salt)

      const user = await userServices.createUserService.execute({
        data: {
          username: data.username,
          password: passwordHash
        }
      })

      return res.status(201).json(userView.render(user))
      
    } catch (error: any) {
      return res.status(400).json(error instanceof ValidationError
        ? {
            type: 'validation',
            message: error.message,
            errors: error.errors,
          }
        : { message: error.message })
    }
  }
}