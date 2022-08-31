import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

import { AppController } from './app.controller'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { FoundModule } from './modules/found/found.module'
import { LostModule } from './modules/lost/lost.module'
import { UserModule } from './modules/user/user.module'
import { DatabaseModule } from './processors/database/database.module'
import { HelperModule } from './processors/helper/helper.module'
import { AggregateModule } from './modules/aggregate/aggregate.module';
import { PhotosModule } from './modules/photos/photos.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    HelperModule,
    LostModule,
    FoundModule,
    LostModule,
    FoundModule,
    AggregateModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 1
    },
  ],
})
export class AppModule {}
