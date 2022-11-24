import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';


@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  exports:[PhotosService]
})


export class PhotosModule {}
