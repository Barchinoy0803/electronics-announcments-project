import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCommentDto: CreateCommentDto, req: Request) {
    try {
      console.log(1);
      
      let userId = req['user'].id
      console.log(userId);
      
      let comment = await this.prisma.comment.create({
        data: { ...createCommentDto, userId }
      })
      return comment
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let comments = await this.prisma.comment.findMany({
        include: { product: true, user: true }
      })
      if (!comments.length) return new HttpException("Not found!", HttpStatus.NOT_FOUND)
      return comments
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let comment = await this.prisma.comment.findUnique({
        where: { id },
        include: { product: true, user: true }
      })
      if (!comment) return new HttpException("Not found!", HttpStatus.NOT_FOUND)
      return comment
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      let updated = await this.prisma.comment.update({
        data: updateCommentDto,
        where: { id }
      })
      return updated
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.comment.delete({ where: { id } })
      return deleted
    } catch (error) {
      return new BadRequestException(error)
    }
  }
}
