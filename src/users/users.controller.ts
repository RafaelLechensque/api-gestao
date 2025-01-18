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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/enums/role.enum';

//mudar a forma de responser, criar uma biblioteca
const responserPost = [
  {
    status: 201,
    description: 'Usuario criado',
    example: {
      name: 'Rafael',
      email: 'rafael1@email.com',
      id: '5e32a79d-2848-474e-aee7-f227592ff4f4',
      isEnabled: true,
      createdDate: '2025-01-08T00:58:29.924Z',
      updatedDate: '2025-01-08T00:58:29.924Z',
    },
  },
  {
    status: 400,
    description: 'Email ja cadastrado',
  },
];

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(Role.SuperAdmin)
  @ApiResponse(responserPost[0])
  @ApiResponse(responserPost[1])
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':uuid')
  findOne(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
