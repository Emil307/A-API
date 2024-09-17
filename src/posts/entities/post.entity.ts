import { ApiProperty } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  body: string;

  @ApiProperty()
  createdAt: Date;
}
