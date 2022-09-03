import { Module } from '@nestjs/common'

import { FoundController } from './found.controller'
import { FoundService } from './found.service'
import { PhotosModule } from '../photos/photos.module'

@Module({
  imports: [PhotosModule],
  controllers: [FoundController],
  providers: [FoundService],
  exports:[FoundService]
})
export class FoundModule {}
