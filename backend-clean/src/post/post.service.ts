import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: {
    title: string;
    content: string;
    authorId: string;
  }) {
    const author = await this.userRepository.findOne({
      where: { id: data.authorId },
    });

    if (!author) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepository.create({
      title: data.title,
      content: data.content,
      author,
    });

    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find({
      relations: ['author'],
    });
  }

  async findOne(id: string) {
    return this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }
}
