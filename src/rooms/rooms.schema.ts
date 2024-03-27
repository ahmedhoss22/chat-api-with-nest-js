import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Message } from 'src/message/message.schema';
import { User } from 'src/user/user.schema';
const bcrypt = require('bcryptjs');

@Schema()
export class Rooms {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  users: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Types.ObjectId, ref: Message.name })
  messages:  mongoose.Types.ObjectId[];
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
