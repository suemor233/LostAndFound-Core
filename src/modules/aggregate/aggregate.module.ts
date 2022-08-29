import { Module } from '@nestjs/common';
import { AggregateService } from './aggregate.service';
import { AggregateController } from './aggregate.controller';
import { UserModule } from '../user/user.module';
import { FoundModule } from '../found/found.module';
import { LostModule } from '../lost/lost.module';

@Module({
  controllers: [AggregateController],
  providers: [AggregateService],
  imports: [UserModule, FoundModule, LostModule],
})

export class AggregateModule {}
