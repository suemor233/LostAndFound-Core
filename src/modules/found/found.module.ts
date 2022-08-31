import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FoundController } from './found.controller'
import { FoundService } from './found.service'
import { Found } from './found.entity'
import { PhotosModule } from '../photos/photos.module'

@Module({
  imports: [TypeOrmModule.forFeature([Found]),PhotosModule],
  controllers: [FoundController],
  providers: [FoundService],
  exports:[FoundService]
})
export class FoundModule {}
