import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { ValidationError } from 'yup'
import { KeyLike, SignJWT } from 'jose'

import { UserServices } from '@services/UserServices'
import { userSchemaValidation } from './../UserController/UserSchemaValidation'
import { env } from '@env'
import { UserView } from '@views/UserView'

interface IGenerateTokenDTO {
  payload: any
  secretKey: Uint8Array | KeyLike
  alg: string
}

const userServices = new UserServices()
const userView = new UserView()

async function generateToken(data: IGenerateTokenDTO): Promise<string> {
  const jwtIssuer = String(env('JWT_ISSUER'))
  const jwtAudience = String(env('JWT_AUDIENCE'))

  const oneDayInSeconds = 86400

 /* Adding the current time in milliseconds to the number of seconds in a day. */
  const expirationTime = Date.now() + oneDayInSeconds
  
  /* Creating a JWT token. */
  const token = await new SignJWT(data.payload)
      .setProtectedHeader({ alg: data.alg })
      .setIssuedAt()
      .setIssuer(jwtIssuer)
      .setAudience(jwtAudience)
      .setExpirationTime(expirationTime)
      .sign(data.secretKey)

  return token
}

export class AuthController {
  async auth(req: Request, res: Response) {
    try {
      const { username, password } = req.body
      
      const secretKey = new TextEncoder().encode(env('JWT_SECRET'))
      
      const data = {
        username,
        password
      }
      
      await userSchemaValidation.validate(data, {
        abortEarly: false
      })

      
      const user = await userServices.getUserService.execute({
        where: {
          username
        }
      })

      const passwordCompared = await compare(password, user.password)
  
      if (passwordCompared === false) {
        throw new Error('username or password invalid')
      }

      const token = await generateToken({ 
        alg: 'HS256',
        payload: {
          userId: user.id
        },
        secretKey
      })

      
      return res.status(200).json({
        user: userView.render(user),
        token
      })
      
    } catch (error: any) {
      let statusCode: number = 400

      if (error.message.includes('invalid')) statusCode = 401

      return res.status(statusCode).json(error instanceof ValidationError
        ? {
            type: 'validation',
            message: error.message,
            errors: error.errors,
          }
        : { message: error.message })
    }
  }
}