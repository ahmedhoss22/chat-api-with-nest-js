import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rooms } from './rooms.schema';
import mongoose, { Model } from 'mongoose';
import { RoomDto } from './dtos/room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Rooms.name) private Room: Model<Rooms>) {}

  addRoom(data: RoomDto) {
    let newRoom = new this.Room({
      name: data.name,
      users: [],
    });
    newRoom.users.push(data.user)
    return newRoom.save();
  }

  async joinRoom(
    userId: mongoose.Types.ObjectId,
    roomId: mongoose.Types.ObjectId,
  ) {
    let room = await this.Room.findById(roomId);
    if (!room) {
      throw new NotFoundException('Room not Found');
    }

    room.users.push(userId);
    await room.save();
    return room;
  }

  async getRoomData(id: mongoose.Types.ObjectId) {
    let data = await this.Room.findById(id)
      .populate('messages')
      .populate('users');
    return data;
  }
}
