import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.schema';
import { GoogleStrategy } from './strategy/google-strategy';
import { SessionSerializer } from 'src/utilities/serializer';
import { LocalStrategy } from './strategy/local-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService , GoogleStrategy   , SessionSerializer , LocalStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AuthModule {}
