import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from '../posts/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from '../../database/entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  // GET /posts/:id
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  // POST /posts
  @HttpPost()
  create(
    @Body() body: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.create(body);
  }

  // PUT /posts/:id
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.update(id, body);
  }

  // DELETE /posts/:id
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe()) id: number,
  ): Promise<void> {
    return this.postsService.remove(id);
  }
}
