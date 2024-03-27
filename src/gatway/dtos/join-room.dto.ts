import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class JoiRoomDto {
  @IsNotEmpty()
  userId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  roomId: mongoose.Types.ObjectId;

}
