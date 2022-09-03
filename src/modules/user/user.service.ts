
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'

import { HttpService } from '~/processors/helper/helper.http.service'

import { LoginUserDto } from './user.dto'
import { WX_SECRET } from '~/app.config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserModel } from '~/modules/user/user.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly httpService: HttpService,
  )
   {}

  async createUser(openid: string, user: LoginUserDto) {
    const hasUser = await this.hasUser(openid)
    // 禁止注册两个以上账户
    if (hasUser) {
      throw new BadRequestException('用户已经存在')
    }

    await this.userModel.create({
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
    return await this.userModel.findOne({ openid })
  }

  async hasUser(openid: string) {
    return !!(await this.userModel.findOne({ openid }))
  }

  async getUserInfo(user: LoginUserDto) {
    const _user = user
    
  }

  async getUserInfoByToken(token: string) {
    // this.authService.verifyPayload(token)
  }

  wxUser(id: string) {
    return this.httpService.axiosRef.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${WX_SECRET.appId}&secret=${WX_SECRET.AppSecret}&js_code=${id}&grant_type=authorization_code`,
    )
  }

  patchUserData(user: LoginUserDto, body: LoginUserDto) {
    
  }
}
