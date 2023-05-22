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
import { UserService } from './userBooking.service';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.create(createUserDto);
  }

  @Put('/:id')
  async updateStudent(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingStudent = await this.userService.updateStudent(
      userId,
      updateUserDto,
    );
    return existingStudent;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  findById(@Param('id') id: string) {
    return this.userService.findAll();
  }
}
