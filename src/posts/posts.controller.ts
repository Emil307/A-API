import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOkResponse({ type: PostEntity })
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    return post;
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    return await this.postsService.remove(id);
  }
}
