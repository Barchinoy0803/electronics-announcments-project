import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request, RequestHandler } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createLikeDto: CreateLikeDto, req: Request) {
    try {
      let userId = req['user'].id
      let exsitingLike = await this.prisma.likes.findFirst({ where: { productId: createLikeDto.productId, userId } })
      if (!exsitingLike) {
        let likes = await this.prisma.likes.create({
          data: { productId: createLikeDto.productId, userId }
        })
        return { likes, message: 'Liked👍🏻' }
      } else {
        await this.prisma.likes.delete({ where: { id: exsitingLike.id } })
        return { message: 'Unliked👎🏻' }
      }
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let likes = await this.prisma.likes.findMany({
        include: {
          product: true,
          user: true
        }
      })
      if (!likes.length) return new HttpException("Not found!", HttpStatus.NOT_FOUND)
      return likes
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  // async userLikedProducts(id: string, req: RequestHandler){
  //   let likedProducts = await this.prisma.likes.findMany({
  //     where: {pro}
  //   })
  // }

}
