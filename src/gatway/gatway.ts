import { OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomDto } from './dtos/rooms.dto';
import { instrument } from '@socket.io/admin-ui';
import { RoomsService } from 'src/rooms/rooms.service';
import { JoiRoomDto } from './dtos/join-room.dto';
import { MessageDto } from './dtos/message.dto';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway(5001, {
  cors: {
    origin: ['https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class Mygatway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  constructor(
    private roomService: RoomsService,
    private messageService: MessageService,
  ) {}

  onModuleInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }
  @WebSocketServer()
  private readonly server: Server;

  // private readonly rooms: RoomDto[] = [];

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connect');
    console.log(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnect');
    console.log(client.id);
  }

  @SubscribeMessage('create-room')
  async createRoom(client: Socket, data: CreateRoomDto) {
    console.log(data);

    if (!data.id || !mongoose.isValidObjectId(data.id) || !data.name) {
      return this.server.to(client.id).emit('error', {
        message: 'id and name is required !!',
      });
    }

    let room = await this.roomService.addRoom({
      name: data.name,
      user: data.id,
    });

    this.server
      .to(client.id)
      .emit('create-room', { roomName: room.name, roomId: room._id });
    this.server.to(client.id).socketsJoin(room._id.toString());
  }

  @SubscribeMessage('join-room')
  async joinRoom(client: Socket, data: JoiRoomDto) {
    if (
      !data.userId ||
      !mongoose.isValidObjectId(data.userId) ||
      !data.roomId ||
      !mongoose.isValidObjectId(data.roomId)
    ) {
      return this.server.to(client.id).emit('error', {
        message: 'userId  and roomId is required !!',
      });
    }

    try {
      await this.roomService.joinRoom(data.userId, data.roomId);
      this.server.to(client.id).socketsJoin(data.roomId.toString());
    } catch (error) {
      this.server.to(client.id).emit('error', {
        message: 'Room not found',
      });
    }

  }

  @SubscribeMessage('send-message')
  async sendMessage(client: Socket, data: MessageDto) {
    if (
      !data.content ||
      !data.roomId ||
      !data.userId ||
      !mongoose.isValidObjectId(data.userId) ||
      !mongoose.isValidObjectId(data.roomId)
    ) {
      return this.server.to(client.id).emit('error', {
        message: 'userId , content and roomId is required !!',
      });
    }
    try {
      this.messageService.addMessage(data)
      let roomData =await this.roomService.getRoomData(data.roomId)
      this.server.to(data.roomId.toString()).emit("recieve-message", data)

    } catch (error) {
      console.log(error.message);
      
      this.server.to(client.id).emit('error', {
        message: 'Room not found',
      });
    }
  }
}
