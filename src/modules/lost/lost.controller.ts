import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
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

  @Get('/list')
  @ApiOperation({ summary: '当前用户的失物' })
  @Auth()
  async onlyLost(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,

  ) {
    const lost = await this.lostService.lostList(pageCurrent, pageSize, true, true)
    return {
      ...lost,
      totalCount: lost.lostData.length,
      
    }
  }

  @Get('/alreary')
  @ApiOperation({ summary: '当前用户已找回的失物' })
  @Auth()
  async lostAlreary(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
    @CurrentUser() user: UserModel
  ) {
    const lost = await this.lostService.lostList(
      pageCurrent,
      pageSize,
      true,
      false,
      user
    )
    return {
      ...lost,
      totalCount: lost.lostData.length,
    }
  }

  @Post()
  @ApiOperation({ summary: '创建找丢失' })
  @Auth()
  async create(@CurrentUser() user: UserModel, @Body() lostDto: LostDto) {
    return await this.lostService.save(user, lostDto)
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改丢失' })
  @Auth()
  async update(@CurrentUser() user: UserModel, @Body() lostDto: LostDto,@Param('id') id: string) {
    return await this.lostService.update(user, lostDto,id)
  }

  @Post('/enter_back')
  @ApiOperation({ summary: '改变当前状态' })
  @Auth()
  async changeState(@CurrentUser() user: UserModel, @Body('id') id: string,@Body('state') state = 0) {
    return this.lostService.changeState(user, id,state)
  }


  @Get(':id')
  @ApiOperation({ summary: '根据 id 获取丢失信息' })
  async findLostById(@Param('id') id: string) {
    return this.lostService.findLostById(id)
  }

  @Get()
  @ApiOperation({ summary: '丢失中和已找回的数量' })
  @Auth()
  async total(@CurrentUser() user: UserModel) {
    return {
      lost: await this.lostService.total(user),
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.lostService.uploadPhoto(file, body.id, body.cover === '1')
  }

  @Post('/upload/remove')
  @UseInterceptors(FileInterceptor('file'))
  @Auth()
  async removeUploadPhoto(@Body() body) {
    return this.lostService.removeUploadPhoto(body.id,body.url)
  }


  
}


