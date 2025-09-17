export class CreateFeedResourceDto {
  title: string;
  type: string;
  url: string;
  internalTitle?: string;
  internalDescription?: string;
  categoryIds?: string[];
}
