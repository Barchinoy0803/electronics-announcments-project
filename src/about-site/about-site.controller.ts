import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AboutSiteService } from './about-site.service';
import { CreateAboutSiteDto } from './dto/create-about-site.dto';
import { UpdateAboutSiteDto } from './dto/update-about-site.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';

@Controller('about-site')
export class AboutSiteController {
  constructor(private readonly aboutSiteService: AboutSiteService) {}

  @Roles(USER_ROLE.ADMIN, USER_ROLE.SUPERADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAboutSiteDto: CreateAboutSiteDto) {
    return this.aboutSiteService.create(createAboutSiteDto);
  }

  @Get()
  findAll() {
    return this.aboutSiteService.findAll();
  }

  @Roles(USER_ROLE.ADMIN, USER_ROLE.SUPERADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutSiteDto: UpdateAboutSiteDto) {
    return this.aboutSiteService.update(id, updateAboutSiteDto);
  }

  @Roles(USER_ROLE.ADMIN, USER_ROLE.SUPERADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutSiteService.remove(id);
  }
}
