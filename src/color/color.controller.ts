import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { USER_ROLE } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) { }


  @Roles(USER_ROLE.ADMIN, USER_ROLE.SUPERADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(id);
  }

  
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(id, updateColorDto);
  }

  
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorService.remove(id);
  }
}
