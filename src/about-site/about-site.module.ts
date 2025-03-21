import { Module } from '@nestjs/common';
import { AboutSiteService } from './about-site.service';
import { AboutSiteController } from './about-site.controller';

@Module({
  controllers: [AboutSiteController],
  providers: [AboutSiteService],
})
export class AboutSiteModule {}
