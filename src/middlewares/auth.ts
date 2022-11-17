import { Request, Response, NextFunction } from 'express'
import { jwtVerify } from 'jose'

import { env } from '@env'

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const secretKey = new TextEncoder().encode(env('JWT_SECRET'))
    
    if (!req.headers.authorization) throw new Error('Token not provided')

    const token = req.headers.authorization?.replace('Bearer', '').trim()

    const tokenDecoded = await jwtVerify(token, secretKey)

    req.body.userId = tokenDecoded.payload.userId
    
    next()
  } catch (error: any) {
    let statusCode = 401

    if (!error.message.includes('Token')) statusCode = 400

    return res.status(statusCode).json({
      message: error.message || 'Unauthorized'
    })
  }
}