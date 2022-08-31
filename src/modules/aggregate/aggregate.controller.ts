import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { Auth } from '~/common/decorator/auth.decorator'
import { CurrentUser } from '~/common/decorator/current-user.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { User } from '~/modules/user/user.entity'

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
  async aggregate(@CurrentUser() _user: User) {
    const tasks = await Promise.allSettled([
      _user,
      this.lostService.total(_user),
      this.foundService.total(_user),
    ])

    const [user, lost, found] = tasks.map((t) => {
      if (t.status === 'fulfilled') {
        return t.value
      } else {
        return null
      }
    })
    Object.assign(user, { lost, found })
    return {
      ...user,
    }
  }

  @Get('/list')
  @ApiOperation({ summary: '分页获取失物信息' })
  async lostFoundList(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lostFound = await this.aggregateService.lostFoundList(pageCurrent, pageSize)
    return {
      lostFound,
      totalCount:lostFound[0].lengthCurrent + lostFound[1].lengthCurrent,
    }
  }

  @Get('/last')
  @ApiOperation({ summary: '分页获取失物信息' })
  async lostFoundList2(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lostFound = await this.aggregateService.lostFoundList(pageCurrent, pageSize)
    return {
      lostFound,
      totalCount:lostFound[0].lengthCurrent + lostFound[1].lengthCurrent,
    }
  }

  @Get('/lost')
  @ApiOperation({ summary: '分页获取失物信息' })
  async lostFoundList3(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lostFound = await this.aggregateService.lostFoundList(pageCurrent, pageSize)
    return {
      lostFound,
      totalCount:lostFound[0].lengthCurrent + lostFound[1].lengthCurrent,
    }
  }

  @Get('/found')
  @ApiOperation({ summary: '分页获取失物信息' })
  async lostFoundList4(
    @Query('pageCurrent') pageCurrent: number,
    @Query('pageSize') pageSize: number,
  ) {
    const lostFound = await this.aggregateService.lostFoundList(pageCurrent, pageSize)
    return {
      lostFound,
      totalCount:lostFound[0].lengthCurrent + lostFound[1].lengthCurrent,
    }
  }
}
