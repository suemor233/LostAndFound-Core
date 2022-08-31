import { Injectable } from '@nestjs/common'

import { FoundService } from '../found/found.service'
import { LostService } from '../lost/lost.service'

@Injectable()
export class AggregateService {
  constructor(
    private readonly lostService: LostService,
    private readonly foundService: FoundService,
  ) {}

  async lostFoundList(pageCurrent: number, pageSize: number) {
    // const lostPageSize = pageSize / 2
    // const foundPageSize = pageSize / 2
    const lostFound = await this.getLostFound(pageCurrent, pageSize)
    // const lost = lostFound[0]
    // const found = lostFound[1]
    // if (lost.lengthCurrent < lostPageSize ) {
    //   this.foundService.foundList(pageCurrent, pageSize / 2)
    // }
    return lostFound
  }

  async getLostFound(pageCurrent: number, pageSize: number) {
    return await Promise.all([
      await this.lostService.lostList(pageCurrent, pageSize / 2),
      await this.foundService.foundList(pageCurrent, pageSize / 2),
    ])
  }
}
