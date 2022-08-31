import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../user/user.entity'
import { LostController } from './lost.controller'
import { Lost } from './lost.entity'
import { LostService } from './lost.service'
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lost, User]),PhotosModule],
controllers: [LostController],
  providers: [LostService],
  exports: [LostService],
})
export class LostModule {}
