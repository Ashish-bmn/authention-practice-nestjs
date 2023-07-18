import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService:UserService,
    private jwtService:JwtService){

  }
  
async login(username:string,pass:string){
  //find user with this username using findOne() from userService
  const foundUser=await this.userService.findOne(username);
  if(foundUser?.password!==pass){
    throw new UnauthorizedException();
  }
  // const {password,...result}=foundUser;
  // return result;
  const payload = { sub: foundUser.id, username: foundUser.username };
    return{
      accessToken:await this.jwtService.signAsync(payload)
    }

}
}
