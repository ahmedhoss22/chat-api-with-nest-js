import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
const bcrypt = require('bcryptjs');

@Schema()
export class Message {
  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'users' })
  user: mongoose.Types.ObjectId;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
