import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createColorDto: CreateColorDto) {
    try {
      let color = await this.prisma.color.create({ data: createColorDto })
      return color
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let colors = await this.prisma.color.findMany()
      if (!colors.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return colors
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let color = await this.prisma.color.findUnique({ where: { id } })
      if (!color) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return color
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    try {
      let updated = await this.prisma.color.update({
        data: updateColorDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.color.delete({ where: { id } })
      return deleted;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
