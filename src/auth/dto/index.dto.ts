import { ApiProperty, PartialType } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({ required: true })
  email: string

  @ApiProperty({ required: true })
  password: string
}

export class AuthRefreshDto {
  @ApiProperty({ required: true })
  refreshToken: string
}
