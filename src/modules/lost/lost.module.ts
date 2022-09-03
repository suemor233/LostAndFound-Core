import { Module } from '@nestjs/common'

import { PhotosModule } from '../photos/photos.module'
import { LostController } from './lost.controller'
import { LostService } from './lost.service'

@Module({
  imports: [PhotosModule],
  controllers: [LostController],
  providers: [LostService],
  exports: [LostService],
})
export class LostModule {}
