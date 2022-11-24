import {
  IsString, IsUrl,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
export class LoginUserDto {
  @ApiProperty({ required: true })
  @IsString({ message: '微信code' })
  id: string

  @ApiProperty({ required: true })
  @IsString({ message: '用户名' })
  nickName?: string

  @ApiProperty({ required: true })
  @IsUrl({ require_protocol: true }, { message: '请更正为正确的网址' })
  avatarUrl?: string
}


export class UpdateLoginUserDto {


  @ApiProperty({ required: true })
  @IsString({ message: '用户名' })
  nickName?: string

}
