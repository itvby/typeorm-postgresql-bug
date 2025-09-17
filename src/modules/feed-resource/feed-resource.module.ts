import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeedResourceService } from './feed-resource.service';
import { FeedResourceController } from './feed-resource.controller';
import { FeedResourceEntity } from '../../entities/feed-resource.entity';
import { FeedCategoryEntity } from '../../entities/feed-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedResourceEntity, FeedCategoryEntity])],
  controllers: [FeedResourceController],
  providers: [FeedResourceService],
  exports: [FeedResourceService],
})
export class FeedResourceModule {}
