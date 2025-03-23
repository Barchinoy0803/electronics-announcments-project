import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      let category = await this.prisma.category.create({ data: createCategoryDto })
      return category
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let categories = await this.prisma.category.findMany()
      if (!categories.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return categories
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let category = await this.prisma.category.findUnique({ where: { id } })
      if (!category) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return category
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      let updated = await this.prisma.category.update({
        data: updateCategoryDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.category.delete({ where: { id } })
      return deleted;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
