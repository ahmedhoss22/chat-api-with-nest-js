import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
const bcrypt = require("bcryptjs")

@Schema()
export class User {
  @Prop({required : true , trim:true})
  name: string;

  @Prop({required : true , trim:true})
  email: string;

  @Prop({trim:true})
  password: string;

  @Prop({required : true , trim:true})
  provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save"  ,async function  (next) {
    const user = this

    if( !user.isModified("password")){
        return next()
    }
    try {
        let hashedPassword = await bcrypt.hash(user.password , 8)
        user.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }

})
