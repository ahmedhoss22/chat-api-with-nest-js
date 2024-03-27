import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register-dto';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: RegisterDto) {
    let existUser = await this.authService.findUserByEmail(data.email);
    if (existUser) {
      throw new ConflictException();
    }
    await this.authService.addUser({ ...data, provider: 'local' });
    return { message: 'User Account Created !!' };
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { message: 'User Account Created !!' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect() {
    return 'success !!!';
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  localLogin(@Req() req){
      return req.user
  }
}
