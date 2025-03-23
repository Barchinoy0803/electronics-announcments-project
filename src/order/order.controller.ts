import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import { IsOwner } from 'src/guards/self.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.orderService.create(createOrderDto, req);
  }

  // @UseGuards(IsOwner)
  // @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('getOrdersByUser')
  getOrdersByUser(@Param('id') id: string) {
    return this.orderService.getOrdersByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(IsOwner)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }
}
