import { Model } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { DisableModel } from './disable.model'

@Injectable()
export class DisableService {

  constructor(
    @InjectModel(DisableModel.name)
    private readonly disableModel: Model<DisableModel>,
  ) {}
  async release() {
    const disable = await this.disableModel.findOne()
    if (disable == null) {
      return this.disableModel.create({ disable_release: false })
    }
    await this.disableModel.updateOne({
      disable_release: !disable.disable_release,
    })
    return this.disableModel.findOne()
  }

  isDisable() {
    return this.disableModel.findOne()
  }
}
