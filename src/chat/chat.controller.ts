import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { IsOwner } from 'src/guards/self.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createChatDto: CreateChatDto, @Req() req: Request) {
    return this.chatService.create(createChatDto, req);
  }


  @Roles(USER_ROLE.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @UseGuards(IsOwner)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @UseGuards(IsOwner)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
