import { Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'
import { PhotosModule } from '../photos/photos.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
@Module({
  imports: [PhotosModule,AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
