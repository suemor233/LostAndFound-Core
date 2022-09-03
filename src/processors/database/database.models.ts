import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'

import { UserModel } from '~/modules/user/user.model'

import { FoundModel } from '../../modules/found/found.model'
import { LostModel } from '../../modules/lost/lost.model'

export const databaseModels = [UserModel, LostModel, FoundModel].map((model:any) =>
  MongooseModule.forFeature([
    { name: model.name, schema: SchemaFactory.createForClass(model) },
  ])
)
