import { Injectable } from '@nestjs/common'

import { FoundService } from '../found/found.service'
import { LostService } from '../lost/lost.service'

@Injectable()
export class AggregateService {
  constructor(
    private readonly lostService: LostService,
    private readonly foundService: FoundService,
  ) {}

  async lostFoundList(pageCurrent: number, pageSize: number,last:boolean) {
    const lostFound = await this.getLostFound(pageCurrent, pageSize,last)
    return lostFound
  }

  async getLostFound(pageCurrent: number, pageSize: number,last:boolean) {
    return await Promise.all([
      await this.lostService.lostList(pageCurrent, pageSize / 2,last),
      await this.foundService.foundList(pageCurrent, pageSize / 2,last),
    ])
  }

}
