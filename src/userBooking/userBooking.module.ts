import { Module } from '@nestjs/common';
import { UserService } from './userBooking.service';
import { UserController } from './userBooking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './userBookingschema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
