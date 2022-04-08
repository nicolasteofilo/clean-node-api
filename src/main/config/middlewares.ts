import { Express } from 'express'
import { bodyParse } from '../middlewares/body-parser'
import { cors } from '../middlewares/cors'
import { contentType } from '../middlewares/content-type'

export default (app: Express): void => {
  app.use(bodyParse)
  app.use(cors)
  app.use(contentType)
}
