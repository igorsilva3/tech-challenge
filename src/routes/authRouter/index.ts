import { Router } from 'express'

import { AuthController } from './../../controllers/AuthController/index';

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/', authController.auth)

export { authRouter }