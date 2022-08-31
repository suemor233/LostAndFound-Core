import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '../user/user.entity'
import { FoundDto } from './found.dto'
import { Found } from './found.entity'
import { ObjectId } from 'bson'
import { PhotosService } from '../photos/photos.service';

@Injectable()
export class FoundService {
  constructor(
    @InjectRepository(Found)
    private foundRepository: Repository<Found>,
    private photosService: PhotosService,
  ) {}

  async save(user: User, foundDto: FoundDto) {
    foundDto.foundTime = new Date(foundDto.foundTime)
    foundDto.uid = user.id
    foundDto.state = true
    foundDto.image = []

    return this.foundRepository.save(foundDto)
  }

  async addImage(url: string, id: string) {
    const foundUpdate = await this.foundRepository.findOneBy({
      _id: new ObjectId(id),
    } as any)
    foundUpdate.image.push(url)
    return this.foundRepository.save(foundUpdate)
  }

  async total(user: User) {
    const [UnclaimedCount, claimedCount] = await Promise.all([
      this.foundRepository.countBy({ uid: user.id, state: true }),
      this.foundRepository.countBy({ uid: user.id, state: false }),
    ])
    return { UnclaimedCount, claimedCount }
  }

  async foundList(pageCurrent: number, pageSize: number) {
    const foundData = await this.foundRepository.findAndCount({
      skip: pageSize * (pageCurrent - 1),
      take: pageSize,
    })
    const totalCount = foundData[1]
    const totalPages = Math.ceil(totalCount / pageSize)
    return {
      foundData: foundData[0],
      lengthCurrent: foundData[0].length,
      pageCurrent,
      pageSize,
      totalCount,
      totalPages,
    }
  }

  async uploadPhoto(file: Express.Multer.File, id: any) {
    const img = await this.photosService.uploadPhoto(file)
    return this.addImage(img,id)
  }
}
