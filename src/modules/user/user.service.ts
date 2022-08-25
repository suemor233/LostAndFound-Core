import { Repository } from 'typeorm'

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { WX_Secret } from '~/app.config'
import { HttpService } from '~/processors/helper/helper.http.service'

import { AuthService } from '../auth/auth.service'
import { LoginUserDto } from './user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {}

  async createUser(openid: string, user: LoginUserDto) {
    const hasUser = await this.hasUser(openid)
    // 禁止注册两个以上账户
    if (hasUser) {
      throw new BadRequestException('用户已经存在')
    }

    await this.usersRepository.save({
      openid,
      nickName: user.nickName,
      avatarUrl: user.avatarUrl,
    })
    return openid
  }

  async login(user: LoginUserDto) {
    const { data } = await this.wxUser(user.id)
    if (!data.openid) {
      throw new ForbiddenException('无效用户')
    }
    !(await this.hasUser(data.openid)) &&
      (await this.createUser(data.openid, user))
    return await this.findById(data.openid)
  }

  async findById(openid: string) {
    return await this.usersRepository.findOneBy({ openid })
  }

  async hasUser(openid: string) {
    return !!(await this.usersRepository.findOneBy({ openid }))
  }

  async getUserInfoByToken(token: string) {
    // this.authService.verifyPayload(token)
  }

  wxUser(id: string) {
    return this.httpService.axiosRef.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_Secret.appId}&secret=${WX_Secret.AppSecret}&js_code=${id}&grant_type=authorization_code`,
    )
  }
}
