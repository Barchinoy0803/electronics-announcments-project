import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { RegionModule } from './region/region.module';
import { AboutSiteModule } from './about-site/about-site.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { ViewsModule } from './views/views.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MailModule } from './mail/mail.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, ProductModule, RegionModule, AboutSiteModule, CommentModule, LikesModule, ViewsModule, OrderModule, ChatModule, ColorModule, CategoryModule, FileUploadModule, MailModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
