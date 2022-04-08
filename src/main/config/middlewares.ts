import { Express } from 'express'
import { bodyParse } from '../middlewares/body-parser'

export default (app: Express): void => {
  app.use(bodyParse)
}
