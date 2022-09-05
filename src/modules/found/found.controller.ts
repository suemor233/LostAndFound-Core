import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorator/auth.decorator'
import { CurrentUser } from '~/common/decorator/current-user.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { UserModel } from '~/modules/user/user.model'

import { FoundDto } from './found.dto'
import { FoundService } from './found.service'

@Controller('found')
@ApiName
export class FoundController {
  constructor(private readonly foundService: FoundService) {}

  @Post()
  @ApiOperation({ summary: '创建找丢失' })
  @Auth()
  async login(@CurrentUser() user: UserModel, @Body() foundDto: FoundDto) {
    return this.foundService.save(user, foundDto)
  }

  @Get()
  @ApiOperation({ summary: '未认领和已认领的数量' })
  @Auth()
  async total(@CurrentUser() user: UserModel) {
    return {
      found: await this.foundService.total(user),
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.foundService.uploadPhoto(file, body.id, body.cover === '1')
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 id 获取寻求信息' })
  async foundLostById(@Param('id') id: string) {
    
    return this.foundService.findFoundById(id)
  }
}
