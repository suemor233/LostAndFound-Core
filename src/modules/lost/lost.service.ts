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
    this.lostRepository.save(LostDto)
    return 'ok'
  }
}
