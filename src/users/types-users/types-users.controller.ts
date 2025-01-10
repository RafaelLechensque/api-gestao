import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypesUsersService } from './types-users.service';
import { CreateTypesUserDto } from './dto/create-types-user.dto';
import { UpdateTypesUserDto } from './dto/update-types-user.dto';
import { Public } from 'src/auth/auth.decorator';

// mudar
@Public()
@Controller('types-users')
export class TypesUsersController {
  constructor(private readonly typesUsersService: TypesUsersService) {}

  @Post()
  create(@Body() createTypesUserDto: CreateTypesUserDto) {
    return this.typesUsersService.create(createTypesUserDto);
  }

  @Get()
  findAll() {
    return this.typesUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesUsersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypesUserDto: UpdateTypesUserDto,
  ) {
    return this.typesUsersService.update(+id, updateTypesUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesUsersService.remove(+id);
  }
}
