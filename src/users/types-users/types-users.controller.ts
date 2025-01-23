import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TypesUsersService } from './types-users.service';
import { CreateTypesUserDto } from './dto/create-types-user.dto';
import { UpdateTypesUserDto } from './dto/update-types-user.dto';
import { Public } from 'src/auth/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/enums/role.enum';

// mudar

@Controller('types-users')
export class TypesUsersController {
  constructor(private readonly typesUsersService: TypesUsersService) {}

  @Roles(Role.SuperAdmin, Role.Admin, Role.Menager)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createTypesUserDto: CreateTypesUserDto) {
    return this.typesUsersService.create(createTypesUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.typesUsersService.findAll();
  }

  @Public()
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.typesUsersService.findOne(id);
  }

  @Roles(Role.SuperAdmin, Role.Admin, Role.Menager)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':uuid')
  update(
    @Param('uuid') id: string,
    @Body() updateTypesUserDto: UpdateTypesUserDto,
  ) {
    return this.typesUsersService.update(id, updateTypesUserDto);
  }

  @Roles(Role.SuperAdmin, Role.Admin, Role.Menager)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.typesUsersService.remove(id);
  }
}
