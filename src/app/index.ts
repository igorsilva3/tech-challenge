import express from 'express'

import cors from 'cors'
import morgan from 'morgan'

import { routes } from '@routes'

export class App {
  core: express.Application

  constructor() {
    this.core = express()
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.core.use(express.json())
    this.core.use(express.urlencoded({ extended: true }))
    this.core.use(cors())
    this.core.use(morgan('dev'))
  }

  private routes() {
    this.core.use(routes)
  }
}
