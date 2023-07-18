import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {

    constructor(@InjectModel(User.name)private userModel:Model<User>,
    private jwtService: JwtService){}
    private readonly users=[
        {
            "id":"1",
            "username":"one@gmail.com",
            "password":"one111"
        },
        {
            "id":"2",
            "username":"two@gmail.com",
            "password":"two222"
        }
    ]

    async signup(body){
        const user={
            username:body.username,
            password:bcrypt.hashSync(body.password,10)
        }
        const savedUser=await this.userModel.create(user);
        const payload={sub:savedUser._id,username:savedUser.username};
        return {
            accessToken:await this.jwtService.signAsync(payload)
        }
    }
    async findOne(username:string){
        return this.userModel.findOne({username:username});
    }
    //we need to use this function in auth module , so we will export this function
}
