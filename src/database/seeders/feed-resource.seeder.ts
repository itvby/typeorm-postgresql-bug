import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { FeedResourceEntity } from '../../entities/feed-resource.entity';
import { FeedCategoryEntity } from '../../entities/feed-category.entity';
import { FeedResourceCategoryEntity } from 'src/entities/feed-resource-category.entity';
import { v4 as uuidv4 } from 'uuid';

export class FeedResourceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const resourceRepository = dataSource.getRepository(FeedResourceEntity);
    const categoryRepository = dataSource.getRepository(FeedCategoryEntity);

    // Get all categories for linking
    const categories = await categoryRepository.find();
    const categoryMap = new Map(categories.map((cat) => [cat.slug, cat]));

    const resourcesData = [
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        title: 'React Documentation',
        type: 'documentation',
        url: 'https://react.dev',
        internalTitle: 'React Official Documentation',
        internalDescription: 'Official React documentation and guides',
        categorySlugs: ['web-development', 'programming'],
      },
      {
        id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
        title: 'Vue.js Guide',
        type: 'documentation',
        url: 'https://vuejs.org/guide/',
        internalTitle: 'Vue.js Official Guide',
        internalDescription: 'Official Vue.js documentation and tutorials',
        categorySlugs: ['web-development', 'programming'],
      },
      {
        id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
        title: 'Angular Documentation',
        type: 'documentation',
        url: 'https://angular.io/docs',
        internalTitle: 'Angular Official Documentation',
        internalDescription: 'Official Angular framework documentation',
        categorySlugs: ['web-development', 'programming'],
      },
      {
        id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
        title: 'Node.js Documentation',
        type: 'documentation',
        url: 'https://nodejs.org/docs/',
        internalTitle: 'Node.js Official Documentation',
        internalDescription: 'Official Node.js runtime documentation',
        categorySlugs: ['web-development', 'programming'],
      },
      {
        id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
        title: 'TypeScript Handbook',
        type: 'documentation',
        url: 'https://www.typescriptlang.org/docs/',
        internalTitle: 'TypeScript Official Handbook',
        internalDescription: 'Official TypeScript language documentation',
        categorySlugs: ['programming'],
      },
      {
        id: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
        title: 'MDN Web Docs',
        type: 'documentation',
        url: 'https://developer.mozilla.org/',
        internalTitle: 'Mozilla Developer Network',
        internalDescription: 'Comprehensive web development documentation',
        categorySlugs: ['web-development', 'programming'],
      },
      {
        id: '6ba7b816-9dad-11d1-80b4-00c04fd430c8',
        title: 'Docker Documentation',
        type: 'documentation',
        url: 'https://docs.docker.com/',
        internalTitle: 'Docker Official Documentation',
        internalDescription: 'Docker containerization platform documentation',
        categorySlugs: ['devops'],
      },
      {
        id: '6ba7b817-9dad-11d1-80b4-00c04fd430c8',
        title: 'Kubernetes Documentation',
        type: 'documentation',
        url: 'https://kubernetes.io/docs/',
        internalTitle: 'Kubernetes Official Documentation',
        internalDescription: 'Kubernetes container orchestration documentation',
        categorySlugs: ['devops'],
      },
      {
        id: '6ba7b818-9dad-11d1-80b4-00c04fd430c8',
        title: 'AWS Documentation',
        type: 'documentation',
        url: 'https://docs.aws.amazon.com/',
        internalTitle: 'Amazon Web Services Documentation',
        internalDescription: 'AWS cloud services documentation',
        categorySlugs: ['devops', 'technology'],
      },
      {
        id: '6ba7b819-9dad-11d1-80b4-00c04fd430c8',
        title: 'GitHub',
        type: 'platform',
        url: 'https://github.com',
        internalTitle: 'GitHub - Code Repository Platform',
        internalDescription:
          'Git-based code repository and collaboration platform',
        categorySlugs: ['programming', 'technology'],
      },
      {
        id: '6ba7b81a-9dad-11d1-80b4-00c04fd430c8',
        title: 'Stack Overflow',
        type: 'community',
        url: 'https://stackoverflow.com',
        internalTitle: 'Stack Overflow - Developer Q&A',
        internalDescription: 'Programming questions and answers community',
        categorySlugs: ['programming', 'technology'],
      },
      {
        id: '6ba7b81b-9dad-11d1-80b4-00c04fd430c8',
        title: 'Medium Technology',
        type: 'blog',
        url: 'https://medium.com/topic/technology',
        internalTitle: 'Medium Technology Articles',
        internalDescription: 'Technology articles and insights on Medium',
        categorySlugs: ['technology'],
      },
      {
        id: '6ba7b81c-9dad-11d1-80b4-00c04fd430c8',
        title: 'Dev.to',
        type: 'community',
        url: 'https://dev.to',
        internalTitle: 'DEV Community',
        internalDescription: 'Developer community and blog platform',
        categorySlugs: ['programming', 'technology'],
      },
      {
        id: '6ba7b81d-9dad-11d1-80b4-00c04fd430c8',
        title: 'Hacker News',
        type: 'news',
        url: 'https://news.ycombinator.com',
        internalTitle: 'Hacker News',
        internalDescription: 'Technology news and discussions',
        categorySlugs: ['technology'],
      },
      {
        id: '6ba7b81e-9dad-11d1-80b4-00c04fd430c8',
        title: 'Product Hunt',
        type: 'platform',
        url: 'https://www.producthunt.com',
        internalTitle: 'Product Hunt',
        internalDescription: 'Discover new products and startups',
        categorySlugs: ['technology', 'business'],
      },
    ];

    for (const resourceData of resourcesData) {
      const existingResource = await resourceRepository.findOne({
        where: { id: resourceData.id },
      });

      if (!existingResource) {
        const resource = resourceRepository.create({
          id: resourceData.id,
          title: resourceData.title,
          type: resourceData.type,
          url: resourceData.url,
          internalTitle: resourceData.internalTitle,
          internalDescription: resourceData.internalDescription,
        });

        resource.resourcesCategories = resourceData.categorySlugs.map(
          (slug) => ({ categoryId: categoryMap.get(slug)?.id }),
        ) as FeedResourceCategoryEntity[];

        await resourceRepository.save(resource);
        console.log(`✅ Created resource: ${resourceData.title}`);
      } else {
        console.log(`⏭️  Resource already exists: ${resourceData.title}`);
      }
    }
  }
}
