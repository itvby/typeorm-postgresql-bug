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

import { FeedTemplateCategoryEntity } from './feed-template-category.entity';
import { FeedCategoryEntity } from './feed-category.entity';

import { BaseEntity } from './base.entity';

export enum FeedTemplateStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
}

@Entity({ name: 'feed_templates' })
export class FeedTemplateEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar' })
  slug!: string;

  @Column({ type: 'enum', enum: FeedTemplateStatus, default: FeedTemplateStatus.UNAVAILABLE })
  status!: FeedTemplateStatus;

  @Column({ type: 'varchar', nullable: true })
  internalTitle!: string | null;

  @Column({ type: 'varchar', nullable: true })
  internalDescription!: string | null;

  // RELATIONSHIPS

  @OneToMany(() => FeedTemplateCategoryEntity, (categoryTemplate) => categoryTemplate.template)
  templatesCategories?: FeedTemplateCategoryEntity[];

  @ManyToMany(() => FeedCategoryEntity, (category) => category.templates)
  @JoinTable({
    name: 'feed_templates_categories',
    joinColumn: {
      name: 'template_id',
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
