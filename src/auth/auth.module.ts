import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserModule,JwtModule.register({
    global: true,
    secret: "jwt-secret",
    signOptions: { expiresIn: '6d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
