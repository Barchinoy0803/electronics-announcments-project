import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutSiteService } from './about-site.service';
import { CreateAboutSiteDto } from './dto/create-about-site.dto';
import { UpdateAboutSiteDto } from './dto/update-about-site.dto';

@Controller('about-site')
export class AboutSiteController {
  constructor(private readonly aboutSiteService: AboutSiteService) {}

  @Post()
  create(@Body() createAboutSiteDto: CreateAboutSiteDto) {
    return this.aboutSiteService.create(createAboutSiteDto);
  }

  @Get()
  findAll() {
    return this.aboutSiteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutSiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutSiteDto: UpdateAboutSiteDto) {
    return this.aboutSiteService.update(+id, updateAboutSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutSiteService.remove(+id);
  }
}
