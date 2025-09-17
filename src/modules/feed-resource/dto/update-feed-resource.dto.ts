import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedResourceDto } from './create-feed-resource.dto';

export class UpdateFeedResourceDto extends PartialType(CreateFeedResourceDto) {}
