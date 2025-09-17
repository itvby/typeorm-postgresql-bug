import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FeedResourceEntity } from '../../entities/feed-resource.entity';
import { FeedCategoryEntity } from '../../entities/feed-category.entity';
import { CreateFeedResourceDto, UpdateFeedResourceDto } from './dto';

@Injectable()
export class FeedResourceService {
  constructor(
    @InjectRepository(FeedResourceEntity)
    private readonly feedResourceRepository: Repository<FeedResourceEntity>,
    @InjectRepository(FeedCategoryEntity)
    private readonly feedCategoryRepository: Repository<FeedCategoryEntity>,
  ) {}

  async create(createFeedResourceDto: CreateFeedResourceDto): Promise<FeedResourceEntity> {
    const { categoryIds, ...resourceData } = createFeedResourceDto;
    
    const resource = this.feedResourceRepository.create(resourceData);
    
    if (categoryIds && categoryIds.length > 0) {
      const categories = await this.feedCategoryRepository.findByIds(categoryIds);
      resource.categories = categories;
    }
    
    return this.feedResourceRepository.save(resource);
  }

  async findAll(): Promise<FeedResourceEntity[]> {
    return this.feedResourceRepository.find({
      relations: ['categories'],
    });
  }

  async findOne(id: string): Promise<FeedResourceEntity> {
    const resource = await this.feedResourceRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!resource) {
      throw new NotFoundException(`Feed resource with ID ${id} not found`);
    }

    return resource;
  }

  async update(id: string, updateFeedResourceDto: UpdateFeedResourceDto): Promise<FeedResourceEntity> {
    const { categoryIds, ...resourceData } = updateFeedResourceDto;
    
    const resource = await this.findOne(id);
    
    Object.assign(resource, resourceData);
    
    if (categoryIds !== undefined) {
      if (categoryIds.length > 0) {
        const categories = await this.feedCategoryRepository.findByIds(categoryIds);
        resource.categories = categories;
      } else {
        resource.categories = [];
      }
    }
    
    return this.feedResourceRepository.save(resource);
  }

  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id);
    await this.feedResourceRepository.remove(resource);
  }
}
