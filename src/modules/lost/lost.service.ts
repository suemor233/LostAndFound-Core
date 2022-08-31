import { ObjectId } from 'bson'
import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '../user/user.entity'
import { LostDto } from './lost.dto'
import { Lost } from './lost.entity'
import { PhotosService } from '../photos/photos.service';

@Injectable()
export class LostService {

  constructor(
    @InjectRepository(Lost)
    private lostRepository: Repository<Lost>,
    private photosService: PhotosService,
  ) {}

  async save(user: User, LostDto: LostDto) {
    LostDto.lostTime = new Date(LostDto.lostTime)
    LostDto.uid = user.id
    LostDto.state = true
    LostDto.image = []
    LostDto.cover = ''
    // LostDto.image.map(async(item) => await this.photosService.uploadPhoto(item))
    return this.lostRepository.save(LostDto)
  }

  async addImage(url: string, id: string,cover:boolean) {
    const lostUpdate = await this.lostRepository.findOneBy({
      _id: new ObjectId(id),
    } as any)
    lostUpdate.image.push(url)
    lostUpdate.cover = cover ? url : lostUpdate.cover
    return this.lostRepository.save(lostUpdate)
  }

  async total(user: User) {
    const [lostCount, foundCount] = await Promise.all([
      this.lostRepository.countBy({ uid: user.id, state: true }),
      this.lostRepository.countBy({ uid: user.id, state: false }),
    ])
    return { lostCount, foundCount }
  }

  async lostList(pageCurrent: number, pageSize: number) {
    const lostData = await this.lostRepository.findAndCount({
      skip: pageSize * (pageCurrent - 1),
      take: pageSize,
    })
    const totalCount = lostData[1]
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      lostData: lostData[0],
      lengthCurrent: lostData[0].length,
      pageCurrent,
      pageSize,
      totalCount,
      totalPages,
    }
  }

  async uploadPhoto(file: Express.Multer.File, id: string,cover:boolean) {
    const img = await this.photosService.uploadPhoto(file)
    return this.addImage(img,id,cover)
  }
}
