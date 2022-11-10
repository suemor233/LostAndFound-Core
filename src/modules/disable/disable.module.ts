import { Module } from '@nestjs/common';
import { DisableService } from './disable.service';
import { DisableController } from './disable.controller';

@Module({
  controllers: [DisableController],
  providers: [DisableService]
})
export class DisableModule {}
