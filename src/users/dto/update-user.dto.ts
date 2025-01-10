import { PartialType } from '@nestjs/mapped-types';
import { AddUserInfo, CreateUserDto } from './create-user.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

export class UpdateUserDto extends IntersectionType(
  CreateUserDto,
  AddUserInfo,
) {}
