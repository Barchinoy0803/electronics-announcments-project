import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { NotificationGateway } from 'src/chat/chat.gateway';

@Module({
  controllers: [OrderController],
  providers: [OrderService, NotificationGateway],
})
export class OrderModule {}
