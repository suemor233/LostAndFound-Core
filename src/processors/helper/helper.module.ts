import { Global, Module, Provider } from '@nestjs/common'


import { HttpService } from './helper.http.service'


const providers: Provider<any>[] = [

  HttpService,

]

@Module({
  providers,
  exports: providers,
})
@Global()
export class HelperModule {}
