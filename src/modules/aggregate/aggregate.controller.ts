import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorator/auth.decorator'
import { CurrentUser } from '~/common/decorator/current-user.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { UserModel } from '~/modules/user/user.model'

import { FoundService } from '../found/found.service'
import { LostService } from '../lost/lost.service'
import { AggregateService } from './aggregate.service'

@Controller('aggregate')
@ApiName
export class AggregateController {
  constructor(
    private readonly aggregateService: AggregateService,
    private readonly lostService: LostService,
    private readonly foundService: FoundService,
  ) {}

  @Get('/stat')
  @Auth()
  async aggregate(@CurrentUser() _user: UserModel) {
    const tasks = await Promise.allSettled([
      _user,
      this.lostService.total(_user),
      this.foundService.total(_user),
    ])

    const [newUser, lost, found] = tasks.map((t) => {
      if (t.status === 'fulfilled') {
        return t.value
      } else {
        return null
      }
    })
    const user = JSON.parse(JSON.stringify(newUser))
    Object.assign(user, { lost, found })
    return {
      user,
    }
  }

  @Get('/last')
  @ApiOperation({ summary: '分页获取失物信息' })
  async lostFoundList(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lostFound = await this.aggregateService.lostFoundList(
      pageCurrent,
      pageSize,
      true,
    )
    return {
      lostFound,
      totalCount: lostFound[0].lostData.length + lostFound[1].foundData.length,
    }
  }

  @Get('/early')
  @ApiOperation({ summary: '最早发布' })
  async lostFoundLast(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lostFound = await this.aggregateService.lostFoundList(
      pageCurrent,
      pageSize,
      false,
    )
    return {
      lostFound,
      totalCount: lostFound[0].lostData.length + lostFound[1].foundData.length,
    }
  }

  @Get('/lost')
  @ApiOperation({ summary: '只看失物' })
  async onlyLost(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lost = await this.lostService.lostList(pageCurrent, pageSize, true)
    return {
      ...lost,
      totalCount: lost.lostData.length,
    }
  }

  @Get('/lost/alreary')
  @ApiOperation({ summary: '已找回的失物' })
  async lostAlreary(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lost = await this.lostService.lostList(
      pageCurrent,
      pageSize,
      true,
      false,
    )
    return {
      ...lost,
      totalCount: lost.lostData.length,
    }
  }

  @Get('/found')
  @ApiOperation({ summary: '只看寻物' })
  async onlyFound(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const found = await this.foundService.foundList(pageCurrent, pageSize, true)
    return {
      ...found,
      totalCount: found.foundData.length,
    }
  }

  @Get('/found/alreary')
  @ApiOperation({ summary: '已找到的寻物' })
  async foundAlreay(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const found = await this.foundService.foundList(
      pageCurrent,
      pageSize,
      true,
      false,
    )
    return {
      ...found,
      totalCount: found.foundData.length,
    }
  }

  @Get('/search')
  @ApiOperation({ summary: '已找到的寻物' })
  async search(@Query('search') search: string) {
    return  Promise.all([
      this.lostService.search(search),
      this.foundService.search(search),
    ])
  }
}
