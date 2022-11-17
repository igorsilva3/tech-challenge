import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { ValidationError } from 'yup'
import { SignJWT } from 'jose'
import { createSecretKey  } from 'crypto'

import { UserServices } from '@services/UserServices'
import { userSchemaValidation } from './../UserController/UserSchemaValidation'
import { env } from '@env'

const userServices = new UserServices()

const secretKey = createSecretKey(String(env('JWT_SECRET')), 'utf-8');

export class AuthController {
  async auth(req: Request, res: Response) {
    try {
      const { username, password } = req.body

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
        throw new Error('Unauthorized')
      }
      
      const jwt = await new SignJWT({ id: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setIssuer(String(env('JWT_ISSUER')))
        .setAudience(String(env('JWT_AUDIENCE')))
        .setExpirationTime(Number(env('JWT_EXPIRATION_TIME')))
        .sign(secretKey)
      
      return res.status(200).json({
        user,
        token: jwt
      })
      
    } catch (error: any) {
      let statusCode: number = 200

      if (error.message == 'Unauthorized') statusCode = 401

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