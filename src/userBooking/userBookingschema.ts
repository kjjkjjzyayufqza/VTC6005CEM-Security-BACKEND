import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { IsDate, IsEmail, IsObject } from 'class-validator'
import mongoose, { HydratedDocument } from 'mongoose'

export type UserBookingDocument = HydratedDocument<UserBooking>

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
  BioNtech = 'BioNtech',
}

@Schema({ versionKey: false })
export class UserBooking {
  @Prop({ required: true })
  nameEn: string

  @Prop({ required: true })
  nameCn: string

  @Prop({ required: true, enum: GenderEnum })
  gender: GenderEnum
  
  @Prop({ required: true})
  identityDN: string

  @Prop({ required: true })
  mobile: string

  @Prop({ required: true })
  @IsDate()
  birthDate: Date

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  birthplace: string

  @Prop({ required: true, enum: VaccineEnum })
  vaccineBrand: VaccineEnum

  @Prop(
    raw({
      id: { type: String },
    }),
  )
  bookDate: Record<string, any>
}

export const UserBookingSchema = SchemaFactory.createForClass(UserBooking)
