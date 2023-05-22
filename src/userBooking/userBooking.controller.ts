import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserBookingService } from './userBooking.service';

@ApiTags('booking')
@Controller('userBooking')
export class UserBookingController {
  constructor(private readonly userBookingService: UserBookingService) {}

  @Post()
  @ApiOperation({ summary: 'summary goes here' })
  @ApiResponse({
    status: 200,
    description: 'description goes here',
    schema: {
      example: 'hello',
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userBookingService.create(createUserDto);
  }

  @Put('/:id')
  async updateStudent(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingStudent = await this.userBookingService.updateStudent(
      userId,
      updateUserDto,
    );
    return existingStudent;
  }

  @Get()
  findAll() {
    return this.userBookingService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  findById(@Param('id') id: string) {
    return this.userBookingService.findAll();
  }
}
