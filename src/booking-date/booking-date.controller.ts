import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookingDateService } from './booking-date.service';
import { CreateBookingDateDto } from './dto/create-booking-date.dto';
import { UpdateBookingDateDto } from './dto/update-booking-date.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingDate } from './booking-date.schema';

@ApiTags('bookingDate')
@Controller('bookingDate')
export class BookingDateController {
  constructor(private readonly bookingDateService: BookingDateService) {}

  @Post()
  create(@Body() createBookingDateDto: CreateBookingDateDto) {
    return this.bookingDateService.create(createBookingDateDto);
  }

  @Get()
  @ApiQuery({
    name: 'startTime',
    type: Date,
    required: false,
  })
  @ApiQuery({
    name: 'endTime',
    type: Date,
    required: false,
  })
  @ApiQuery({
    name: 'venues',
    type: String,
    required: false,
  })
  findAll(
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
    @Query('venues') venues: string,
  ): Promise<BookingDate[]> {
    return this.bookingDateService.find(startTime, endTime, venues);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  async findById(@Param('id') id: Date,): Promise<BookingDate> {
    return this.bookingDateService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingDateService.remove(id);
  }
}
