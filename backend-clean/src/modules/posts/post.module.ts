import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../../database/entities/posts.entity";
import { PostsService } from "./post.service";
import { PostsController } from "../posts/post.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule{}