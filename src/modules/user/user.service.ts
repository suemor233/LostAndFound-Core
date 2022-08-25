import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOptionDto } from './user.dto';
import { User } from './user.entity';
import { nanoid } from 'nanoid'
import { hashSync,compareSync } from 'bcrypt'
import { sleep } from '~/utils/tool.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createUser(user: UserOptionDto) {
    const hasMaster = await this.hasMaster()

    // 禁止注册两个以上账户
    if (hasMaster) {
      throw new BadRequestException('我已经有一个主人了哦')
    }
    user.password = hashSync(user.password, 6)
    const authCode = nanoid(10)

    const res = await this.usersRepository.save({
      ...user,
      authCode
    })
    return { username: res.username, authCode: res.authCode }
  }

  async login(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        username
      },
      select:{
        password:true
      }
    })
    if (!user) {
      await sleep(1000)
      throw new ForbiddenException('用户名不正确')
    }
    if (!compareSync(password, user.password)) {
      await sleep(1000)
      throw new ForbiddenException('密码不正确')
    }

    return user
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }



  async hasMaster() {
    return !!(await this.usersRepository.count())
  }
}