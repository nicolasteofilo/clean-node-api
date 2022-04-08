import { Request, Response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test_body_parser', (req: Request, res: Response) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'test' })
      .expect({ name: 'test' })
  })
})
