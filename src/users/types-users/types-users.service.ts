import { Injectable } from '@nestjs/common';
import { CreateTypesUserDto } from './dto/create-types-user.dto';
import { UpdateTypesUserDto } from './dto/update-types-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesUser } from './entities/types-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypesUsersService {
  constructor(
    @InjectRepository(TypesUser)
    private TyperUsersRepository: Repository<TypesUser>,
  ) {}

  create(createTypesUserDto: CreateTypesUserDto) {
    return 'This action adds a new typesUser';
  }

  findAll() {
    return this.TyperUsersRepository.find();
  }

  findOne(id: string) {
    return this.TyperUsersRepository.findOneBy({ id });
  }

  update(id: number, updateTypesUserDto: UpdateTypesUserDto) {
    return `This action updates a #${id} typesUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} typesUser`;
  }
}
