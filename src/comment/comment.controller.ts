import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { IsOwner } from 'src/guards/self.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    console.log(1);
    
    console.log(req);
    
    return this.commentService.create(createCommentDto, req);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(IsOwner)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @UseGuards(IsOwner)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
