import { DataSource } from 'typeorm';
import { runSeeders, Seeder } from 'typeorm-extension';

import { FeedCategorySeeder } from './feed-category.seeder';
import { FeedResourceSeeder } from './feed-resource.seeder';


export class InitSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    await runSeeders(dataSource, {
      seeds: [FeedCategorySeeder, FeedResourceSeeder],
    });
  }
}
