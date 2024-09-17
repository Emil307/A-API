import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  posts: Post[];
}
