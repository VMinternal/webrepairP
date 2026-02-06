import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { IssuesService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get()
  findAll() {
    return this.issuesService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.issuesService.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateIssueDto) {
    return this.issuesService.create(dto);
  }
}
