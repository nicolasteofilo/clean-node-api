import request from 'supertest'
import app from '../config/app'
import { faker } from '@faker-js/faker'

describe('SingUp Routes', () => {
  test('Should an account on success', async () => {
    await request(app)
      .post('/api/singup')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
