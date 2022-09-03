import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { MONGO_DB } from '~/app.config'

import { databaseModels } from './database.models'

@Global()
@Module({
  imports: [MongooseModule.forRoot(MONGO_DB.uri), ...databaseModels],
  exports: [...databaseModels],
})
export class DatabaseModule {}
