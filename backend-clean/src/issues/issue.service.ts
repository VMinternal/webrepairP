import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './issue.entity';
import { User } from '../users/user.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import slugify from 'slugify';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepo: Repository<Issue>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Issue[]> {
    return this.issueRepo.find({
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findBySlug(slug: string): Promise<Issue> {
    const issue = await this.issueRepo.findOne({
      where: { slug },
      relations: ['createdBy'],
    });

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    return issue;
  }

  async create(dto: CreateIssueDto): Promise<Issue> {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const slug = slugify(dto.title, {
      lower: true,
      strict: true,
    });

    const issue = this.issueRepo.create({
      title: dto.title,
      slug,
      createdBy: user,
    });

    return this.issueRepo.save(issue);
  }
}
