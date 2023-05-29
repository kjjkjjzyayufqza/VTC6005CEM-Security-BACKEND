import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { CreateBookingDateDto } from 'src/booking-date/dto/create-booking-date.dto'
import { UserRole } from '../users.schema'

export class UserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true })
  email: string

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({ required: true })
  refreshToken: string
}

export class CreateUserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true, default: 'a@a.com'  })
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({
    required: true,
    default: UserRole.Staff,
  })
  role: UserRole.Staff
}

export class UpdateUserDto extends PartialType(UserDto) {}
