import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookingDateModule } from './booking-date/booking-date.module';
import { AuthModule } from './auth/auth.module';
import { UserBookingModule } from './userBooking/userBooking.module';
import { UserBookingController } from './userBooking/userBooking.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserBookingModule,
    BookingDateModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UserBookingController],
  providers: [AppService],
})
export class AppModule {}
