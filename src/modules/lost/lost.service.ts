import { abort } from 'process'
import { Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '../user/user.entity'
import { LostDto } from './lost.dto'
import { Lost } from './lost.entity'

@Injectable()
export class LostService {
  constructor(
    @InjectRepository(Lost)
    private lostRepository: Repository<Lost>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async save(user: User, LostDto: LostDto) {
    LostDto.lostTime = new Date(LostDto.lostTime)
    LostDto.uid = user.id
    LostDto.state = true
    this.lostRepository.save(LostDto)
    return 'ok'
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
}
