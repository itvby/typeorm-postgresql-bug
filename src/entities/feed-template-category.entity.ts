import { Entity, ManyToOne, Column } from 'typeorm';

import { FeedCategoryEntity } from './feed-category.entity';
import { FeedTemplateEntity } from './feed-template.entity';

import { BaseEntity } from './base.entity';

@Entity({ name: 'feed_templates_categories' })
export class FeedTemplateCategoryEntity extends BaseEntity {
  @Column('uuid')
  templateId!: string;

  @Column('uuid')
  categoryId!: string;

  @Column({ type: 'integer', nullable: true })
  order!: number | null;

  // RELATIONSHIPS

  @ManyToOne(() => FeedTemplateEntity, (template) => template.templatesCategories, {
    onDelete: 'CASCADE',
  })
  template?: FeedTemplateEntity;

  @ManyToOne(() => FeedCategoryEntity, (category) => category.templatesCategories, {
    onDelete: 'CASCADE',
  })
  category?: FeedCategoryEntity;
}
