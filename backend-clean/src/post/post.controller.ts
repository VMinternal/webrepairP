import { Controller, Get, Post as HttpPost, Body, Param } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  create(
    @Body()
    body: {
      title: string;
      content: string;
      authorId: string;
    },
  ) {
    return this.postsService.create(body);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }
}
