import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutSiteDto } from './create-about-site.dto';

export class UpdateAboutSiteDto extends PartialType(CreateAboutSiteDto) {}
