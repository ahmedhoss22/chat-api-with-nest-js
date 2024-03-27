import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rooms, RoomsSchema } from './rooms.schema';

@Module({
  providers: [RoomsService],
  imports :[MongooseModule.forFeature([{name : Rooms.name  ,schema:RoomsSchema }])],
  exports:[RoomsService]
})

export class RoomsModule {}
