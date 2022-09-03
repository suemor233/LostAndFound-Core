import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorator/auth.decorator'
import { CurrentUser } from '~/common/decorator/current-user.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { UserModel } from '../user/user.model'

import { LostDto } from './lost.dto'
import { LostService } from './lost.service'

@Controller('lost')
@ApiName
export class LostController {
  constructor(private readonly lostService: LostService) {}

  @Post()
  @ApiOperation({ summary: '创建找丢失' })
  @Auth()
  async login( @CurrentUser() user: UserModel,@Body() lostDto: LostDto) {
    return this.lostService.save(user,lostDto)
  }

  @Get()
  @ApiOperation({ summary: '丢失中和已找回的数量' })
  @Auth()
  async total( @CurrentUser() user: UserModel) {
    return {
      lost:await this.lostService.total(user)
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  async uploadPhoto(@UploadedFile() file: Express.Multer.File,@Body() body) {
    return this.lostService.uploadPhoto(file,body.id,body.cover === '1' );
  }
}
