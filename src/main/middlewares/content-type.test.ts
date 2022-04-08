import { Request, Response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Should return Content Type as json by default', async () => {
    app.get('/test_content_type_json', (req: Request, res: Response) => {
      res.send({ message: 'ok' })
    })
    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/i)
  })

  test('Should return xml type when forced', async () => {
    app.get('/test_content_type_xml', (req: Request, res: Response) => {
      res.type('xml')
      res.send({ message: 'ok' })
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/i)
  })
})
