import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDateDto {
  @ApiProperty({ required: true })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ required: true })
  @IsDateString()
  endTime: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  venues: string;
}
