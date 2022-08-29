import { IsString } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class PageDto {

  @ApiProperty({ required: true })
  @IsString({ message: '当前页数' })
  pageCurrent: number

  @ApiProperty({ required: true })
  @IsString({ message: '一页要几条数据' })
  pageSize: number
}
