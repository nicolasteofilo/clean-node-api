/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeSingUpController } from '../factories/singup'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/singup', adaptRoute(makeSingUpController()))
}
