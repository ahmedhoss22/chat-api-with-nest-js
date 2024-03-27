import { BadRequestException, ForbiddenException, Injectable, NotFoundException  } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import {InjectModel} from "@nestjs/mongoose"
import mongoose, { Model } from 'mongoose';
import { RegisterDto } from './dtos/register-dto';
import { GooglerDto } from './dtos/google-dto';
const bcrypt = require("bcryptjs")

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private User  : Model<User>){}

    addUser(data : RegisterDto): Promise<User>{
        let newUser = new this.User(data)
        return newUser.save()
    }

    async googleLogin (data : GooglerDto){
        
        let user = await this.User.findOne({email : data.email})
        if(user){
           return user 
        }

        let newUser = new this.User({...data, provider:"google"})
        return newUser.save()
    }
    async findUser (id : mongoose.Types.ObjectId){
        let user = await this.User.findById(id)
        return user
    }

     findUserByEmail(email : string){
        return this.User.findOne({email})
    }

    async validateLoginData(email : string , password :string){
        const user = await this.User.findOne({email})
        if(! user){
            throw new NotFoundException({message :"User Account not found"})
        }

        const validPass = await bcrypt.compare(password , user.password)
        if(! validPass){
            throw new ForbiddenException()
        }

        return user
    }
}
