import { IsString, IsUrl } from 'class-validator'
import { Document } from 'mongoose'

import { Prop, Schema } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

@Schema({
  collection: 'user',
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
  timestamps: {
    createdAt: 'created',
    updatedAt: false,
  },
  versionKey: false,
})
export class UserModel extends Document {
  @Prop()
  @ApiProperty({ required: true })
  @IsString({ message: '微信code' })
  openid: string

  @Prop()
  @ApiProperty({ required: true })
  @IsString({ message: '用户名' })
  nickName: string

  @Prop()
  @ApiProperty({ required: true })
  @IsUrl({ require_protocol: true }, { message: '请更正为正确的网址' })
  avatarUrl: string

}
