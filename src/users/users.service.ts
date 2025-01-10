import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';
import { TypesUser } from './types-users/entities/types-user.entity';
import { TypesUsersService } from './types-users/types-users.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly typesUsersService: TypesUsersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.cpf = cpf.format(createUserDto.cpf);
    console.log(createUserDto.cpf);

    if (!cpf.isValid(createUserDto.cpf)) {
      throw new BadRequestException('CPF Invalido');
    }

    const checkCpf = await this.usersRepository.findOneBy({
      cpf: createUserDto.cpf,
    });

    if (checkCpf) {
      throw new BadRequestException('CPF ja cadastrado');
    }

    const checkEmail = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (checkEmail) {
      throw new BadRequestException('Email ja cadastrado');
    }

    const checkTyperUser = await this.typesUsersService.findOne(
      createUserDto.typeUserId,
    );

    if (!checkTyperUser) {
      throw new BadRequestException('Tipo de usuario nao encontrado');
    }

    const salt = await genSalt();
    createUserDto.password = await hash(createUserDto.password, salt);
    const newUser = await this.usersRepository.create({
      typeUser: checkTyperUser,
      ...createUserDto,
    });
    const { password, ...rest } = await this.usersRepository.save(newUser);
    return rest;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    // return await this.usersRepository.findOneBy({ email });
    return await this.usersRepository.findOne({
      where: { email },
      relations: { typeUser: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.isEnabled = false;
    await this.usersRepository.save(user);
    return `o Usuario ${user.name} foi desativado`;
  }
}
