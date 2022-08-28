import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FoundController } from './found.controller'
import { FoundService } from './found.service'
import { Found } from './found.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Found])],
  controllers: [FoundController],
  providers: [FoundService],
})
export class FoundModule {}
