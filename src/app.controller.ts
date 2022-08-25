import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PKG from '../package.json'
@Controller()
@ApiTags('Root')
export class AppController {
  @Get(['/', '/info'])
  async appInfo() {
    return {
      name: PKG.name,
      author: PKG.author,
      version: PKG.version,
    }
  }

  @Get('/ping')
  ping(): 'pong' {
    return 'pong'
  }

}
