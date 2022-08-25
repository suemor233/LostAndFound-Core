import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'



export class LoginDto {
  @ApiProperty({ required: true })
  @IsString({ message: '用户名？' })
  username: string

  @ApiProperty({ required: true })
  @IsString({ message: '密码？' })
  password: string
}

export class UserOptionDto extends LoginDto{
  @ApiProperty({ required: false, example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  readonly mail: string
}




