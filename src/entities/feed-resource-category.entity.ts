import { Column, Entity, Index, ManyToOne } from 'typeorm';

import { FeedResourceEntity } from './feed-resource.entity';
import { FeedCategoryEntity } from './feed-category.entity';

import { BaseEntity } from './base.entity';

@Entity({ name: 'feed_resources_categories' })
@Index(['resourceId', 'categoryId'], { unique: true })
export class FeedResourceCategoryEntity extends BaseEntity {
  @Column('uuid')
  resourceId!: string;

  @Column('uuid')
  categoryId!: string;

  @Column({ type: 'integer', nullable: true })
  order!: number | null;

  // RELATIONSHIPS

  @ManyToOne(() => FeedResourceEntity, (resource) => resource.resourcesCategories, {
    onDelete: 'CASCADE',
  })
  resource?: FeedResourceEntity;

  @ManyToOne(() => FeedCategoryEntity, (category) => category.resourcesCategories, {
    onDelete: 'CASCADE',
  })
  category?: FeedCategoryEntity;
}
