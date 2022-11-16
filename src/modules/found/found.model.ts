import mongoose from 'mongoose'

import { Prop, Schema } from '@nestjs/mongoose'
import { UserModel } from '../user/user.model';

@Schema({
  collection: 'found',
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
  timestamps: {
    createdAt: 'created',
    updatedAt: false,
  },
  versionKey: false,
  
})
export class FoundModel  {
  @Prop()
  uid: string;

  @Prop()
  title: string;

  @Prop()
  contact: string;

  @Prop()
  category: string;

  @Prop()
  foundTime: Date;

  @Prop()
  detail: string;

  @Prop([String])
  image: string[];

  @Prop()
  place: string

  @Prop()
  cover: string;

  @Prop({default:true})
  state: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name })
  user: UserModel
}
