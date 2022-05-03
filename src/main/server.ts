import 'dotenv/config'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    console.log('📊 Connected to MongoDB')
    app.listen(process.env.PORT || 5050, () =>
      console.log(`🏃 Running on port http://localhost:${env.port || 5050}`)
    )
  })
  .catch((error) => console.log(error))
