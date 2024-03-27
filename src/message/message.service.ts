import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDto } from 'src/gatway/dtos/message.dto';
import { Rooms } from 'src/rooms/rooms.schema';
import { Message } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Rooms.name) private Room: Model<Rooms>,
    @InjectModel(Message.name) private Message: Model<Message>,
  ) {}

  async addMessage(data: MessageDto) {
    console.log(data);
    
    let room = await this.Room.findById(data.roomId)
    console.log("room");
    console.log(room);
    
    if(room || !room?.users?.includes(data.userId)){
      throw new BadRequestException({message: "User not in room"})
    }

    let newMessage = new this.Message(data)
    await newMessage.save()
    

    room.messages.push(newMessage._id)
    await room.save()
}
}
