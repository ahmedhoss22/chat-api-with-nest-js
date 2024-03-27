import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get("/user-data")
    getUserData(){
        return "Hello from user-data"
    }

}
