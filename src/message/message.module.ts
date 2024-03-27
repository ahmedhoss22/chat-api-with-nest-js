import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { RoomsModule } from 'src/rooms/rooms.module';
import { Rooms, RoomsSchema } from 'src/rooms/rooms.schema';

@Module({
  providers: [MessageService],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RoomsModule,
    MongooseModule.forFeature([{ name: Rooms.name, schema: RoomsSchema }]),
  ],
  exports: [MessageService],
})
export class MessageModule {}
