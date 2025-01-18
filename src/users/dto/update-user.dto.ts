import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { CreateUserDto, AddUserInfo } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
  PartialType(AddUserInfo),
) {}
