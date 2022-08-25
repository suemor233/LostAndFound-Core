import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { AuthService } from '../auth/auth.service'

import { LoginDto, UserOptionDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiName
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() userDto: UserOptionDto) {
    return await this.userService.createUser(userDto)
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const user = await this.userService.login(dto.username, dto.password)
    const { username, mail } = user
    return {
      username,
      mail,
      token: await this.authService.signToken(user.id.toString()),
      expiresIn: 7,
    }
  }
}
