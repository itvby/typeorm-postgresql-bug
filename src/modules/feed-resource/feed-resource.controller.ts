import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FeedResourceService } from './feed-resource.service';
import { CreateFeedResourceDto, UpdateFeedResourceDto } from './dto';

@Controller('feeds/resources')
export class FeedResourceController {
  constructor(private readonly feedResourceService: FeedResourceService) {}

  @Post()
  create(@Body() createFeedResourceDto: CreateFeedResourceDto) {
    return this.feedResourceService.create(createFeedResourceDto);
  }

  @Get()
  findAll() {
    return this.feedResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.feedResourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFeedResourceDto: UpdateFeedResourceDto,
  ) {
    return this.feedResourceService.update(id, updateFeedResourceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.feedResourceService.remove(id);
  }
}
