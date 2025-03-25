import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationGateway } from 'src/chat/chat.gateway';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationGateway
  ) { }
  async create(createOrderDto: CreateOrderDto, req: Request) {
    try {
      let userId = req['user']?.id;
      if (!userId) return new BadRequestException('User ID not found');

      if (!createOrderDto.productId) {
        return new BadRequestException('Product ID is required');
      }

      let product = await this.prisma.product.findUnique({
        where: { id: createOrderDto.productId },
        select: { count: true }
      });

      if (!product) {
        return new BadRequestException('Product not found');
      }

      if (product.count < createOrderDto.count) {
        return new BadRequestException('Product is out of stock');
      }

      let order = await this.prisma.order.create({
        data: { ...createOrderDto, userId },
      });

      await this.prisma.product.update({
        data: { count: { decrement: 1 } },
        where: { id: createOrderDto.productId },
      });

      this.notification.sendOrderNotification(product)
      return order;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message || 'Failed to create order');
    }
  }

  async findAll() {
    try {
      let orders = await this.prisma.order.findMany({
        include: {
          product: true,
          user: true
        }
      })
      if (!orders.length) return new HttpException("Not found!", HttpStatus.NOT_FOUND)
      return orders
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let order = await this.prisma.order.findUnique({
        where: { id },
        include: {
          product: true,
          user: true
        }
      })
      if (!order) return new HttpException("Not found!", HttpStatus.NOT_FOUND)
      return order
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updateOrder = await this.prisma.order.update({
        data: updateOrderDto,
        where: { id }
      })
    } catch (error) {
      return new BadRequestException(error)
    }
  }

  async getOrdersByUser(id: string) {
    try {
      let orders = await this.prisma.order.findMany({
        where: { userId: id }
      })
      if (!orders) return new NotFoundException("Not found")
      return orders
    } catch (error) {
      return new BadRequestException(error)
    }
  }
}
