import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class MessageDto {
  @IsNotEmpty()
  userId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  roomId: mongoose.Types.ObjectId;

}
