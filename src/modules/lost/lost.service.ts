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

  update(user: UserModel, lostDto: LostDto, id: string) {
    return this.lostModel.updateOne({ _id: id }, lostDto)
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
      this.lostModel.count({ user: user._id, state: true }).lean(),
      this.lostModel.count({ user: user._id, state: false }).lean(),
    ])
    return { lostCount, foundCount }
  }

  async lostList(
    pageCurrent: number,
    pageSize: number,
    last: boolean,
    state = true,
    user?: UserModel,
  ) {
    let lostData
    if (user) {
      lostData = await this.lostModel
        .find({ state, user: user._id })
        .sort({ _id: `${last ? 'desc' : 'asc'}` })
        .skip(pageSize * (pageCurrent - 1))
        .limit(pageSize)
        .populate('user')
        .lean()
    } else {
      lostData = await this.lostModel
        .find({ state })
        .sort({ _id: `${last ? 'desc' : 'asc'}` })
        .skip(pageSize * (pageCurrent - 1))
        .limit(pageSize)
        .populate('user')
        .lean()
    }

    const totalCount = await this.lostModel.find({ state }).count()
    const totalPages = Math.ceil(totalCount / pageSize)

    return {
      lostData,
      totalCount,
      totalPages,
    }
  }

  async uploadPhoto(file: Express.Multer.File, id: string, cover: boolean) {
    if (!file) {
      return
    }

    const img = await this.photosService.uploadPhoto(file)
    return this.addImage(img, id, cover)
  }

  async removeUploadPhoto(id: string, url: string) {
    const lost = await this.lostModel.findById(id)
    await this.lostModel.findByIdAndUpdate(id, {
      $pull: { image: url },
      $set: {
        cover: `${lost.cover == url ? lost.image[1] || '' : lost.cover}`,
      },
    })
  }

  async findLostById(id: string) {
    return this.lostModel.findOne({ _id: id }).populate('user')
  }

  async changeState(user: UserModel, id: string, state: number) {
    const lost = await this.lostModel.findById(id)
    if (lost.user == user.id) {
      return this.lostModel.updateOne(
        {
          _id: id,
        },
        { $set: { state: !!state } },
      )
    }
  }

  async search(search: string) {
    const reg = new RegExp(search, 'i')
    return this.lostModel.find({
      $or: [{ title: reg }, { category: reg }, { detail: reg },{ place: reg }],
      state: true
    })
  }
}
