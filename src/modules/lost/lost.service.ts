import { Model } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { UserModel } from '~/modules/user/user.model'

import { PhotosService } from '../photos/photos.service'
import { LostDto } from './lost.dto'
import { LostModel } from './lost.model'

@Injectable()
export class LostService {
  constructor(
    @InjectModel(LostModel.name)
    private readonly lostModel: Model<LostModel>,
    private photosService: PhotosService,
  ) {}

  async save(user: UserModel, LostDto: LostDto) {
    LostDto.lostTime = new Date(LostDto.lostTime)
    LostDto.state = true
    LostDto.image = []
    LostDto.cover = ''
    LostDto.user = user
    return this.lostModel.create(LostDto)
  }

  async addImage(url: string, id: string, cover: boolean) {
    let lostUpdate

    if (cover) {
      lostUpdate = await this.lostModel.updateOne(
        {
          _id: id,
        },
        { $push: { image: url }, $set: { cover: url } },
      )
    } else {
      lostUpdate = await this.lostModel.updateOne(
        {
          _id: id,
        },
        { $push: { image: url } },
      )
    }

    return lostUpdate
  }

  async total(user: UserModel) {
    const [lostCount, foundCount] = await Promise.all([
      this.lostModel.count({ uid: user.id, state: true }).lean(),
      this.lostModel.count({ uid: user.id, state: false }).lean(),
    ])
    return { lostCount, foundCount }
  }

  async lostList(pageCurrent: number, pageSize: number,last:boolean) {
    const lostData = await this.lostModel
      .find({ state: true })
      .skip(pageSize * (pageCurrent - 1))
      .limit(pageSize)
      .sort({ _id: `${last ? 'desc' : 'asc'}` })
      .populate('user')
      .lean()
    const totalCount = await this.lostModel.find({ state: true }).count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      lostData,
      totalCount,
      totalPages,
    }
  }

  async uploadPhoto(file: Express.Multer.File, id: string, cover: boolean) {
    const img = await this.photosService.uploadPhoto(file)
    return this.addImage(img, id, cover)
  }
}
