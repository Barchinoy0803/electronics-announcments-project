import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      let region = await this.prisma.region.create({ data: createRegionDto })
      return region
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let regions = await this.prisma.region.findMany()
      if (!regions.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return regions
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findOne(id: string) {
    try {
      let region = await this.prisma.region.findUnique({ where: { id } })
      if (!region) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return region
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let updated = await this.prisma.region.update({
        data: updateRegionDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.region.delete({ where: { id } })
      return deleted;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
