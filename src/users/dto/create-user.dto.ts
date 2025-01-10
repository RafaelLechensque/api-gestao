import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Rafael' })
  name: string;

  @ApiProperty({ example: '061.009.551-05' })
  cpf: string;

  @ApiProperty({ example: 'rafael@email.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: '3818634c-739d-4ea3-b804-7a04d5efea8f' })
  typeUserId: string;
}

export class AddUserInfo {
  @ApiProperty({ example: false })
  isEnabled: boolean;
}
