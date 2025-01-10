import { Module } from '@nestjs/common';
import { TypesUsersService } from './types-users.service';
import { TypesUsersController } from './types-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesUser } from './entities/types-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypesUser])],
  controllers: [TypesUsersController],
  providers: [TypesUsersService],
  exports: [TypesUsersService],
})
export class TypesUsersModule {}
