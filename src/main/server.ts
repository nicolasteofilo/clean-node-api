import 'dotenv/config'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    console.log('📊 Connected to MongoDB')
    app.listen(env.port, () =>
      console.log(`🏃 Running on port http://localhost:${env.port}!`)
    )
  })
  .catch((error) => console.log(error))
