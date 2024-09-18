import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto, ownerId: number) {
    console.log(createPostDto?.predecessorId);
    return this.prisma.post.create({
      data: {
        body: createPostDto.body,
        predecessorId: createPostDto?.predecessorId,
        ownerId: ownerId,
      },
      include: { owner: true },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: { owner: true, successor: true },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findFirst({
      where: { id: id },
      include: { owner: true, successor: true },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id: id }, data: updatePostDto });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id: id } });
  }
}
