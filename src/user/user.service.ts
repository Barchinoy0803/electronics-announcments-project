import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { MailService } from 'src/mail/mail.service';
import { USER_STATUS } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as  dotenv from "dotenv"

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService
  ) { }

  async findByEmail(email: string) {
    try {
      let user = await this.prisma.user.findFirst({ where: { email } })
      return user
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      let { email, password } = createUserDto;
      let user = await this.findByEmail(email);
      if (user) throw new HttpException("Already exists!", HttpStatus.ALREADY_REPORTED);

      let hashPassword = await bcrypt.hash(password, 10);
      let newUser = {
        ...createUserDto,
        password: hashPassword
      };

      let created = await this.prisma.user.create({ data: newUser });
      await this.mailService.sendOtpToEmail(email);
      return created;
    } catch (error) {
      throw new BadRequestException(error.message || "Something went wrong!");
    }
  }


  async activate(email: string, otp: string) {
    try {
      let user = await this.prisma.user.findFirst({ where: { email } })
      if (!user) return new UnauthorizedException("not found!")
      if (user.status == USER_STATUS.ACTIVE) return new HttpException("Already activated, please login!", HttpStatus.ALREADY_REPORTED)
      await this.mailService.activate(otp)
      await this.prisma.user.update({ where: { email }, data: { status: USER_STATUS.ACTIVE } })
    } catch (error) {
      return new BadRequestException(error)
    }
  }



  async login(loginUserDto: LoginUserDto) {
    try {
      let { email, password } = loginUserDto;

      let user = await this.prisma.user.findFirst({ where: { email } });

      if (!user) throw new NotFoundException("User not found!");

      let matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) throw new BadRequestException("Wrong credentials!");

      if (user.status === USER_STATUS.INACTIVE) {
        throw new BadRequestException("Your email is not activated, please activate");
      }

      return {
        access_token: this.generateAccessToken({ id: user.id, role: user.role }),
        refresh_token: this.generateRefreshToken({ id: user.id, role: user.role })
      };
    } catch (error) {
      throw new InternalServerErrorException("Something went wrong!");
    }
  }


  refreshToken(req: Request) {
    let { id, name } = req['user'];
    return { access_token: this.generateAccessToken({ id, name }) };
  }


  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '30d'
    })
  }

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_KEY,
      expiresIn: '15m',
    });
  }


  async findAll() {
    try {
      let users = await this.prisma.user.findMany({
        include: { region: true }
      })
      if (!users.length) return new HttpException("Not found!", HttpStatus.NOT_FOUND)
      return users
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.prisma.user.findUnique({ where: { id } })
      if (!user) return new NotFoundException("Not found")
      return user
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let updated = await this.prisma.user.update({
        data: updateUserDto,
        where: { id }
      })
      return updated
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.user.delete({ where: { id } })
      return deleted
    } catch (error) {
      return new BadRequestException(error)
    }
  }
}
