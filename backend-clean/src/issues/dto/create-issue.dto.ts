import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  title: string;

  @IsUUID()
  userId: string;
}
