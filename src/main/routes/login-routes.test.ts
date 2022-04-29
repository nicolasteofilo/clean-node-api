import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcryptjs'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /singup', () => {
    test('Should return 201 on singup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Nicolas',
          email: 'nicolas.teofilo@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(201)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on singup', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Nicolas',
        email: 'nicolas.teofilo@gmail.com',
        password,
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'nicolas.teofilo@gmail.com',
          password: '123',
        })
        .expect(200)
    })
  })
})
