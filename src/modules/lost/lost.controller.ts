import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorator/auth.decorator'
import { CurrentUser } from '~/common/decorator/current-user.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { User } from '../user/user.entity'

import { LostDto } from './lost.dto'
import { LostService } from './lost.service'

@Controller('lost')
@ApiName
export class LostController {
  constructor(private readonly lostService: LostService) {}

  @Post()
  @ApiOperation({ summary: '创建找丢失' })
  @Auth()
  async login( @CurrentUser() user: User,@Body() lostDto: LostDto) {
    return this.lostService.save(user,lostDto)
  }

  @Get()
  @ApiOperation({ summary: '丢失中和已找回的数量' })
  @Auth()
  async total( @CurrentUser() user: User) {
    return {
      lost:await this.lostService.total(user)
    }
  }
}
