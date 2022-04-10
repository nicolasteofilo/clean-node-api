import request from 'supertest'
import app from '../config/app'
import { faker } from '@faker-js/faker'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SingUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should an account on success', async () => {
    await request(app)
      .post('/api/singup')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(201)
  })
})
