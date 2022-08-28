import {
  IsString,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
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

  uid?:string

}



