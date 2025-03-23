import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, MailModule, JwtModule.register({ global: true })],
  controllers: [UserController],
  providers: [UserService, PrismaService, MailService],
})
export class UserModule { }
