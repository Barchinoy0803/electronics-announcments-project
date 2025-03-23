import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAboutSiteDto } from './dto/create-about-site.dto';
import { UpdateAboutSiteDto } from './dto/update-about-site.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AboutSiteService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAboutSiteDto: CreateAboutSiteDto) {
    try {
      let about = await this.prisma.aboutSite.create({ data: createAboutSiteDto })
      return about
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      let information = await this.prisma.aboutSite.findMany()
      if (!information.length) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return information
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async update(id: string, updateAboutSiteDto: UpdateAboutSiteDto) {
    try {
      let updated = await this.prisma.aboutSite.update({
        data: updateAboutSiteDto,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.aboutSite.delete({ where: { id } })
      return deleted;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
