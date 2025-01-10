import { Test, TestingModule } from '@nestjs/testing';
import { TypesUsersService } from './types-users.service';

describe('TypesUsersService', () => {
  let service: TypesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypesUsersService],
    }).compile();

    service = module.get<TypesUsersService>(TypesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
