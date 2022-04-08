import { Request, Response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('Cors Parser Middleware', () => {
  test('Should enable cors', async () => {
    app.get('/test_cors', (req: Request, res: Response) => {
      res.send({ message: 'ok' })
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
