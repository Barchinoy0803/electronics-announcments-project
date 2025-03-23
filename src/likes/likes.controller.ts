import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Req() req: Request) {
    return this.likesService.create(createLikeDto, req);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }
}
