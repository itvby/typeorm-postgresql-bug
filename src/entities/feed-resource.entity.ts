import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import slugify from 'slugify';

import { FeedCategoryEntity } from './feed-category.entity';
import { FeedResourceCategoryEntity } from './feed-resource-category.entity';

import { BaseEntity } from './base.entity';

@Entity({ name: 'feed_resources' })
export class FeedResourceEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  slug!: string;

  @Column({ type: 'varchar' })
  type!: string;

  @Column({ type: 'varchar' })
  url!: string;

  @Column({ type: 'varchar', nullable: true })
  internalTitle!: string | null;

  @Column({ type: 'varchar', nullable: true })
  internalDescription!: string | null;

  // RELATIONSHIPS

  @OneToMany(
    () => FeedResourceCategoryEntity,
    (resourceCategory) => resourceCategory.resource,
    { cascade: true },
  )
  resourcesCategories?: FeedResourceCategoryEntity[];

  @ManyToMany(() => FeedCategoryEntity, (category) => category.resources)
  @JoinTable({
    name: 'feed_resources_categories',
    joinColumn: {
      name: 'resource_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    synchronize: false,
  })
  categories?: FeedCategoryEntity[];

  // HOOKS

  @BeforeInsert()
  @BeforeUpdate()
  setAliasAndSlug() {
    if (this.title && !this.slug) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
  }
}
