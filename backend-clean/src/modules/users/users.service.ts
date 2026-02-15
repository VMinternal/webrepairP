import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../database/entities/users.entity";
import { Post } from "../../database/entities/posts.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }

    // GET /users/:id
  async findOne(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // POST /users
  create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  // PUT /users/:id
  async update(id: string, data: Partial<User>): Promise<User> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  // DELETE /users/:id
  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
