import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
import { ValidationPipe } from '@nestjs/common';
import * as session from "express-session"
import * as passport from "passport"

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  dotenv.config()

  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  app.setGlobalPrefix("/api")
  
  app.use(
    session({
      secret: 'sadsadewdsad',
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge : 600000
      }
    }),
  );

  app.use(passport.initialize())
  app.use(passport.session())
  

  const port = process.env.PORT || 5000
  await app.listen(port , ()=>{
      console.log(`App is running on port : ${port}`);
      
  });

}
bootstrap();