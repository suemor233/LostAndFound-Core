import { Model } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { PhotosService } from '../photos/photos.service'
import { UserModel } from '../user/user.model'
import { FoundDto } from './found.dto'
import { FoundModel } from './found.model'

@Injectable()
export class FoundService {
  constructor(
    @InjectModel(FoundModel.name)
    private readonly foundModel: Model<FoundModel>,
    private photosService: PhotosService,
  ) {}

  async save(user: UserModel, foundDto: FoundDto) {
    foundDto.foundTime = new Date(foundDto.foundTime)
    foundDto.user = user
    foundDto.state = true
    foundDto.cover = ''
    foundDto.image = []

    return this.foundModel.create(foundDto)
  }

  async addImage(url: string, id: string, cover: boolean) {
    let foundUpdate
    if (cover) {
      foundUpdate = await this.foundModel.updateOne(
        {
          _id: id,
        },
        { $push: { image: url }, $set: { cover: url } },
      )
    } else {
      foundUpdate = await this.foundModel.updateOne(
        {
          _id: id,
        },
        { $push: { image: url } },
      )
    }
    return foundUpdate
  }

  async total(user: UserModel) {
    const [UnclaimedCount, claimedCount] = await Promise.all([
      this.foundModel.count({ uid: user.id, state: true }).lean(),
      this.foundModel.count({ uid: user.id, state: false }).lean(),
    ])
    return { UnclaimedCount, claimedCount }
  }

  async foundList(pageCurrent: number, pageSize: number, last: boolean) {
    const foundData = await this.foundModel
      .find({ state: true })
      .skip(pageSize * (pageCurrent - 1))
      .limit(pageSize)
      .sort({ _id: `${last ? 'desc' : 'asc'}` })
      .populate('user')
      .lean()
    const totalCount = await this.foundModel.find({ state: true }).count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      foundData,
      totalCount,
      totalPages,
    }
  }

  async uploadPhoto(file: Express.Multer.File, id: string, cover: boolean) {
    const img = await this.photosService.uploadPhoto(file)
    return this.addImage(img, id, cover)
  }
}
