import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsEmail } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum RoleEnum {
  Admin = 'Admin',
  Staff = 'Staff',
}

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
}

export enum VaccineEnum {
  Sinovac = 'Sinovac',
  Biontech = 'Biontech',
}

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  name_en: string;

  @Prop({ required: true })
  name_cn: string;

  @Prop({ required: true, enum: GenderEnum })
  gender: GenderEnum;

  @Prop({ required: true })
  @IsDate()
  birthdate: Date;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  birthplace: string;

  @Prop({ required: true, enum: VaccineEnum })
  vaccine_brand: VaccineEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
