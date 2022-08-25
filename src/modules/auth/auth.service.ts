import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { MasterLostException } from '~/common/exceptions/master-lost.exception';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async signToken(id: string) {
    const user = await this.usersRepository.findOne(id as any)
    if (!user) {
      throw new MasterLostException()
    }
    const authCode = user.authCode
    const payload = {
      id,
      authCode,
    }
    
    return this.jwtService.sign(payload)
  }

  async verifyPayload(payload: JwtPayload) {
    const user = await this.usersRepository.findOne({
      where:{
        id:payload._id
      }
    })

    if (!user) {
      throw new MasterLostException()
    }

    return user && user.authCode === payload.authCode ? user : null
  }
}
