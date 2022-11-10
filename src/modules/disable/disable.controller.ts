import { Controller, Get, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { ApiName } from '~/common/decorator/openapi.decorator'

import { DisableService } from './disable.service'

// 此接口纯属傻逼
@Controller('disable')
@ApiName
export class DisableController {
  constructor(private readonly disableService: DisableService) {}

  @Post('/release')
  @ApiOperation({ summary: '过审核专用' })
  async disableRelease() {
    return this.disableService.release()
  }

  @Get('/release')
  @ApiOperation({ summary: '获取是否禁用发布' })
  async isDisable() {
    return this.disableService.isDisable()
  }
}
