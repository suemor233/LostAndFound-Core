import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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

  @Patch(':id')
  @ApiOperation({ summary: '修改丢失' })
  @Auth()
  async update(@CurrentUser() user: UserModel, @Body() foundDto: FoundDto,@Param('id') id: string) {
    return await this.foundService.update(user, foundDto,id)
  }


  @Post('/enter_back')
  @ApiOperation({ summary: '确认丢失' })
  @Auth()
  async changeState(@CurrentUser() user: UserModel, @Body('id') id: string,@Body('state') state = 0) {
    return this.foundService.changeState(user, id,state)
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

  @Post('/upload/remove')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  async removeUploadPhoto(@Body() body) {
    return this.foundService.removeUploadPhoto(body.id,body.url)
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 id 获取寻求信息' })
  async foundLostById(@Param('id') id: string) {
    
    return this.foundService.findFoundById(id)
  }
}
