import { Test, TestingModule } from '@nestjs/testing';
import { TypesUsersController } from './types-users.controller';
import { TypesUsersService } from './types-users.service';

describe('TypesUsersController', () => {
  let controller: TypesUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypesUsersController],
      providers: [TypesUsersService],
    }).compile();

    controller = module.get<TypesUsersController>(TypesUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
