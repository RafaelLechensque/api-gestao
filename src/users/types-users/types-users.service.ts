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

  async create(createTypesUserDto: CreateTypesUserDto) {
    const typer = await this.TyperUsersRepository.create(createTypesUserDto);

    return await this.TyperUsersRepository.save(typer);
  }

  async findAll() {
    return await this.TyperUsersRepository.find();
  }

  async findOne(id: string) {
    return await this.TyperUsersRepository.findOneBy({ id });
  }

  async update(id: string, updateTypesUserDto: UpdateTypesUserDto) {
    return await this.TyperUsersRepository.update(id, updateTypesUserDto);
  }

  async remove(id: string) {
    return await this.TyperUsersRepository.delete({ id });
  }
}
