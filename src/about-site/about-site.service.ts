import { Injectable } from '@nestjs/common';
import { CreateAboutSiteDto } from './dto/create-about-site.dto';
import { UpdateAboutSiteDto } from './dto/update-about-site.dto';

@Injectable()
export class AboutSiteService {
  create(createAboutSiteDto: CreateAboutSiteDto) {
    return 'This action adds a new aboutSite';
  }

  findAll() {
    return `This action returns all aboutSite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aboutSite`;
  }

  update(id: number, updateAboutSiteDto: UpdateAboutSiteDto) {
    return `This action updates a #${id} aboutSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutSite`;
  }
}
