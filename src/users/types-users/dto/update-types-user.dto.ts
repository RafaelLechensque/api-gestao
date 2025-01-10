import { PartialType } from '@nestjs/swagger';
import { CreateTypesUserDto } from './create-types-user.dto';

export class UpdateTypesUserDto extends PartialType(CreateTypesUserDto) {}
