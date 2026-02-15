import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../database/entities/posts.entity';
import { User } from '../../database/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repo: Repository<Post>,
  ) {}

  // GET /posts
  findAll(): Promise<Post[]> {
    return this.repo.find({
      relations: ['user'], // load user kèm theo
    });
  }

  // GET /posts/:id
  async findOne(id: string): Promise<Post> {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  // POST /posts
  async create(data: CreatePostDto): Promise<Post> {
    const post = this.repo.create({
         title: data.title,
        content: data.content,
      user: { id:data.userId } as User, 
    });

    return this.repo.save(post);
  }

  // PUT /posts/:id
  async update(id: string, data: any): Promise<Post> {
    await this.repo.update(id, {
      ...data,
      user: data.userId ? ({ id: data.userId } as User) : undefined,
    });

    return this.findOne(id);
  }

  // DELETE /posts/:id
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
