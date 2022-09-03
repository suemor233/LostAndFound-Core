import { Schema } from '@nestjs/mongoose'

@Schema({
  timestamps: {
    createdAt: true,
  },
  versionKey: false,
})
export class BaseModel {}
