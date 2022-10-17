import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { LoginUserDto } from './user.dto'
import { UserService } from './user.service'
import { AuthService } from '../auth/auth.service';
import { Auth } from '~/common/decorator/auth.decorator'
import { CurrentUser } from '~/common/decorator/current-user.decorator'


@Controller('user')
@ApiName
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}


  @Post()
  @ApiOperation({ summary: '登录' })
  @HttpCode(200)
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.userService.login(loginDto)
    return {
      user,
      token: await this.authService.signToken(user.openid),
      expiresIn: 7,
    }
  }

  @Get()
  @ApiOperation({
    summary:'获取用户基本信息',
  })
  @HttpCode(200)
  @Auth()
  async getUserInfo( @CurrentUser() user: LoginUserDto) {
    return user
  }

  @Patch()
  @ApiOperation({ summary: '修改用户基本信息' })
  @Auth()
  async patchMasterData(
    @Body() body: LoginUserDto,
    @CurrentUser() user: LoginUserDto,
  ) {
    return await this.userService.patchUserData(user, body)
  }

  @Get('check_logged')
  @ApiOperation({ summary: '判断当前 Token 是否有效 ' })
  @Auth()
  checkLogged() {
    return 'ok'
  }
}
