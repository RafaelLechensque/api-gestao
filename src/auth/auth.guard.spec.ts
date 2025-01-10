import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let jwtService: JwtService;
  let reflector: Reflector;
  let authGuard: AuthGuard;

  beforeEach(() => {
    jwtService = new JwtService({});
    reflector = new Reflector();
    authGuard = new AuthGuard(jwtService, reflector);
  });
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
