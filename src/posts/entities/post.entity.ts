import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class PostEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  body: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({ required: false })
  predecessorId?: number;

  @ApiProperty({ type: UserEntity })
  owner: UserEntity;

  constructor({ owner, ...data }: Partial<PostEntity>) {
    Object.assign(this, data);

    if (owner) {
      this.owner = new UserEntity(owner);
    }
  }
}
