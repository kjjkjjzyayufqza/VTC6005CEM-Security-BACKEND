import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/index.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './userBookingschema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateStudent(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      const existingStudent = await this.userModel.findByIdAndUpdate(
        userId,
        updateUserDto,
      );
      if (!existingStudent) {
        throw new NotFoundException(`Student #${userId} not found`);
      }
      return existingStudent;
    }else{
      throw new NotFoundException(`Student #${userId} not found`);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  
}
