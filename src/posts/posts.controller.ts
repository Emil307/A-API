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
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationParamsDto } from './dto/paginationParams.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseInterceptors(CacheInterceptor)
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostEntity })
  async create(@Body() createPostDto: CreatePostDto, @Req() request) {
    return new PostEntity(
      await this.postsService.create(createPostDto, request.user.id),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiOkResponse({ type: PostEntity })
  async findAll(@Query() { offset, limit }: PaginationParamsDto) {
    const posts = await this.postsService.findAll(offset, limit);
    return posts.map((post) => new PostEntity(post));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = new PostEntity(await this.postsService.findOne(id));

    if (!post) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    return post;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request,
  ) {
    const post = new PostEntity(await this.postsService.findOne(id));

    if (!post) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    if (request.user.id !== post.ownerId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return new PostEntity(await this.postsService.update(id, updatePostDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const post = new PostEntity(await this.postsService.findOne(id));

    if (!post) {
      throw new NotFoundException(`Post with ${id} does not exist.`);
    }

    if (request.user.id !== post.ownerId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return new PostEntity(await this.postsService.remove(id));
  }
}
