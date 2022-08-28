import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { FoundDto } from './found.dto';
import { Found } from './found.entity';

@Injectable()
export class FoundService {
  constructor(
    @InjectRepository(Found)
    private foundRepository: Repository<Found>,
  ) {}

  async save(user: User, foundDto: FoundDto) {
    foundDto.foundTime = new Date(foundDto.foundTime)
    foundDto.uid = user.id
    this.foundRepository.save(foundDto)
    return 'ok'
  }
}
