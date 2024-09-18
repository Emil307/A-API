import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
