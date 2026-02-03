import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {UsersController} from './users.controller'
import { Issue } from '../issues/issue.entity';
import { Part } from '../parts/part.entity';
import { Post } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Issue, Part, Post])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}