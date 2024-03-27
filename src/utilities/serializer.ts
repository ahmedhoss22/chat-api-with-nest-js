import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";

export class SessionSerializer extends PassportSerializer{
    constructor(@Inject(AuthService) private authservice : AuthService){
        super();
    }
    serializeUser(user: any, done: Function) {
        done(null , user)
    }

    deserializeUser(payload: any, done: Function) {
        const user = this.authservice.findUser(payload._id)
        return user ? done(null , user) : done (null , null )
    }

}