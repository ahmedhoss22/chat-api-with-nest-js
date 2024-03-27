import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { GatwayModule } from './gatway/gatway.module';
import { RoomsModule } from './rooms/rooms.module';
import { MessageModule } from './message/message.module';
import { BlogModule } from './blog/blog.module';
dotenv.config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    PassportModule.register({ session: true }),
    GatwayModule,
    RoomsModule,
    MessageModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
