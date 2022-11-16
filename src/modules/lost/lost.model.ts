import { IsString, IsUrl } from 'class-validator'
import mongoose from 'mongoose'

import { Prop, Schema } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { UserModel } from '../user/user.model'

@Schema({
  collection: 'lost',
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
  timestamps: {
    createdAt: 'created',
    updatedAt: false,
  },
  versionKey: false,
})
export class LostModel  {
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

  @Prop()
  title: string

  @Prop()
  contact: string

  @Prop()
  category: string

  @Prop()
  place: string

  @Prop()
  lostTime: Date

  @Prop()
  detail: string

  @Prop([String])
  image: string[]

  @Prop()
  cover: string

  @Prop({ default: true })
  state: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name })
  user: UserModel
}
