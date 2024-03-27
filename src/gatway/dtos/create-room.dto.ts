import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoomDto {
  @IsNotEmpty()
  id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string

}
