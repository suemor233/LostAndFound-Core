import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MONGO_DB } from '~/app.config'
import { databaseModels } from './database.models'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: MONGO_DB.host,
      port: MONGO_DB.port,
      database: MONGO_DB.dbName,
      entities: databaseModels,
    }),
  ],
})
@Global()
export class DatabaseModule {}
