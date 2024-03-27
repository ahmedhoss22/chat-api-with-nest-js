import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {User , UserSchema} from "./user.schema"

@Module({
  controllers: [UserController],
  imports :[MongooseModule.forFeature([{name : User.name , schema: UserSchema}])]
})
export class UserModule {}
