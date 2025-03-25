import { Module } from '@nestjs/common';
import { NotificationGateway } from './chat.gateway';

@Module({
  controllers: [],
  providers: [NotificationGateway],
})
export class ChatModule {}
