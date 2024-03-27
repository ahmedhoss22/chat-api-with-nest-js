import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class RoomDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: mongoose.Types.ObjectId;

  @IsOptional()
  messages?: mongoose.Types.ObjectId;
}
