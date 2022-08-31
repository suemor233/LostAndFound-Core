import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';

import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports:[PhotosService]
})


export class PhotosModule {}
