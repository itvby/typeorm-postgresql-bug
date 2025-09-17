import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import slugify from 'slugify';

import { BaseEntity } from './base.entity';
import { FeedTemplateCategoryEntity } from './feed-template-category.entity';
import { FeedTemplateEntity } from './feed-template.entity';
import { FeedResourceEntity } from './feed-resource.entity';
import { FeedResourceCategoryEntity } from './feed-resource-category.entity';

@Entity({ name: 'feed_categories' })
export class FeedCategoryEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  slug!: string;

  @Column({ type: 'varchar', nullable: true })
  internalTitle!: string | null;

  @Column({ type: 'varchar', nullable: true })
  internalDescription!: string | null;

  // RELATIONSHIPS

  @OneToMany(() => FeedTemplateCategoryEntity, (templateCategory) => templateCategory.category)
  templatesCategories?: FeedTemplateCategoryEntity[];

  @ManyToMany(() => FeedTemplateEntity, (template) => template.categories)
  templates!: FeedTemplateEntity[];

  @OneToMany(() => FeedResourceCategoryEntity, (resourceCategory) => resourceCategory.category)
  resourcesCategories?: FeedResourceCategoryEntity[];

  @ManyToMany(() => FeedResourceEntity, (resource) => resource.categories)
  resources!: FeedResourceEntity[];

  // HOOKS

  @BeforeInsert()
  @BeforeUpdate()
  setAliasAndSlug() {
      if (this.title && !this.slug) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
  }
}
