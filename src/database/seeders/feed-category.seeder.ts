import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FeedCategoryEntity } from '../../entities/feed-category.entity';
import { v4 as uuidv4 } from 'uuid';

export class FeedCategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const categoryRepository = dataSource.getRepository(FeedCategoryEntity);

    const categoriesData = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Technology',
        internalTitle: 'Technology News',
        internalDescription: 'Latest technology news and updates',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        title: 'Programming',
        internalTitle: 'Programming Resources',
        internalDescription: 'Programming tutorials, guides and resources',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        title: 'Web Development',
        internalTitle: 'Web Development',
        internalDescription: 'Frontend and backend web development resources',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        title: 'Mobile Development',
        internalTitle: 'Mobile Development',
        internalDescription: 'iOS and Android development resources',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        title: 'DevOps',
        internalTitle: 'DevOps & Infrastructure',
        internalDescription: 'DevOps tools, practices and infrastructure management',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        title: 'Data Science',
        internalTitle: 'Data Science & Analytics',
        internalDescription: 'Data science, machine learning and analytics resources',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        title: 'Design',
        internalTitle: 'UI/UX Design',
        internalDescription: 'User interface and user experience design resources',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        title: 'Business',
        internalTitle: 'Business & Entrepreneurship',
        internalDescription: 'Business strategies and entrepreneurship resources',
      },
    ];

    for (const categoryData of categoriesData) {
      const existingCategory = await categoryRepository.findOne({
        where: { id: categoryData.id },
      });

      if (!existingCategory) {
        const category = categoryRepository.create({
          id: categoryData.id,
          title: categoryData.title,
          internalTitle: categoryData.internalTitle,
          internalDescription: categoryData.internalDescription,
        });
        await categoryRepository.save(category);
        console.log(`✅ Created category: ${categoryData.title}`);
      } else {
        console.log(`⏭️  Category already exists: ${categoryData.title}`);
      }
    }
  }
}
