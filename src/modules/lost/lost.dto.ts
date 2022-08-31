import {
  IsOptional,
  IsString,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'
export class LostDto {
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
  @IsString({ message: '丢失时间不能为空' })
  lostTime?: Date 

  @ApiProperty({ required: true })
  @IsString({ message: '详情不能为空' })
  detail?: string

  @ApiProperty({ nullable:false })
  image?: string[]
  
  uid?:string

  state?:boolean

}



