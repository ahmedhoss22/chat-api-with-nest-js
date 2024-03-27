import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
dotenv.config();

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AuthService) private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK + '/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToekn: string, refreshToken: string, profile: Profile) {
    let name  = profile.displayName
    let email  = profile?.emails[0]?.value
    console.log("profile");
    console.log(profile);
    
    let user =  await this.authService.googleLogin({name , email})
    return user 
}
}
