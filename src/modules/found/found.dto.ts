import { IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
import { UserModel } from '../user/user.model'

export class FoundDto {
  @ApiProperty({ required: true })
  @IsString({ message: '标题不能为空' })
  title: string

  @ApiProperty({ required: true })
  @IsString({ message: '联系方式不能为空' })
  contact?: string

  @ApiProperty({ required: true })
  @IsString({ message: '分类不能为空' })
  category?: string

  @ApiProperty({ required: true })
  @IsString({ message: '捡到时间不能为空' })
  foundTime?: Date

  @ApiProperty({ required: true })
  @IsString({ message: '详情不能为空' })
  detail?: string

  @ApiProperty({ nullable:false })
  image?: string[]

  @ApiProperty({ nullable:false })
  cover?: string
  
  @ApiProperty({ nullable:false })
  user?: UserModel

  uid?: string

  state?: boolean
}
