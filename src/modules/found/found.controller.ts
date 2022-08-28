import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from '~/common/decorator/auth.decorator';
import { CurrentUser } from '~/common/decorator/current-user.decorator';
import { User } from '../user/user.entity';
import { FoundService } from './found.service';
import { FoundDto } from './found.dto';

@Controller('found')
export class FoundController {
  constructor(private readonly foundService: FoundService) {}

  @Post()
  @ApiOperation({ summary: '创建找丢失' })
  @Auth()
  async login( @CurrentUser() user: User,@Body() foundDto: FoundDto) {
    return this.foundService.save(user,foundDto)
  }
}
