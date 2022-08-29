import { Module } from '@nestjs/common';
import { LostService } from './lost.service';
import { LostController } from './lost.controller';
import { Lost } from './lost.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lost,User])],
  controllers: [LostController],
  providers: [LostService],
  exports:[LostService]
})
export class LostModule {}
