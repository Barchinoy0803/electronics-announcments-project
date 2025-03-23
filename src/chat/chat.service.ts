import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createChatDto: CreateChatDto, req: Request) {
    try {
      let { fromId } = req['user']
      let chat = await this.prisma.chat.create({ data: { ...createChatDto, fromId } })
      return chat
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let chats = await this.prisma.chat.findMany({
        include: {
          from: true,
          to: true
        }
      })
      if (!chats.length) return new HttpException("Empty", HttpStatus.NOT_FOUND)
      return chats
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let chat = await this.prisma.chat.findUnique({
        where: { id },
        include: {
          from: true,
          to: true
        }
      })
      if (!chat) return new HttpException("Empty", HttpStatus.NOT_FOUND)
      return chat
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    try {
      let updated = await this.prisma.chat.update({
        data: updateChatDto,
        where: { id }
      })
      return updated
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.chat.delete({ where: { id } })
      return {message: "Successfully deleted!"}
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async getChatsByUser(){

  }
}
