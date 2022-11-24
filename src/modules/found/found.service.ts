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
      this.foundModel.count({ user: user._id, state: true }).lean(),
      this.foundModel.count({ user: user._id, state: false }).lean(),
    ])
    return { UnclaimedCount, claimedCount }
  }

  async foundList(
    pageCurrent: number,
    pageSize: number,
    last: boolean,
    state = true,
    user?: UserModel,
  ) {
    let foundData
    if (user) {
      foundData = await this.foundModel
        .find({ state, user: user._id })
        .sort({ _id: `${last ? 'desc' : 'asc'}` })
        .skip(pageSize * (pageCurrent - 1))
        .limit(pageSize)
        .populate('user')
        .lean()
    } else {
      foundData = await this.foundModel
        .find({ state })
        .sort({ _id: `${last ? 'desc' : 'asc'}` })
        .skip(pageSize * (pageCurrent - 1))
        .limit(pageSize)
        .populate('user')
        .lean()
    }

    const totalCount = await this.foundModel.find({ state }).count()
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      foundData,
      totalCount,
      totalPages,
    }
  }
  update(user: UserModel, lostDto: FoundDto, id: string) {
    return this.foundModel.updateOne({ _id: id }, lostDto)
  }
  async uploadPhoto(file: Express.Multer.File, id: string, cover: boolean) {
    if (!file) {
      return
    }
    const img = await this.photosService.uploadPhoto(file)

    return this.addImage(img, id, cover)
  }
  async findFoundById(id: string) {
    return this.foundModel.findOne({ _id: id }).populate('user')
  }

  async removeUploadPhoto(id: string, url: string) {
    const found = await this.foundModel.findById(id)
    await this.foundModel.findByIdAndUpdate(id, {
      $pull: { image: url },

      $set: { cover: `${found.cover == url ? '' : found.cover}` },
    })
  }

  async changeState(user: UserModel, id: string, state: number) {
    const lost = await this.foundModel.findById(id)
    if (lost.user == user.id) {
      return this.foundModel.updateOne(
        {
          _id: id,
        },
        { $set: { state: !!state } },
      )
    }
  }

  async search(search: string) {
    const reg = new RegExp(search, 'i')
    return this.foundModel.find({
      $or: [{ title: reg }, { category: reg }, { detail: reg },{ place: reg }],
      state: true
    })
  }
}
