import { User } from 'src/users/entities/user.entity';
import { TypesUser } from 'src/users/types-users/entities/types-user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SeedsUsers1736453022463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.getRepository(TypesUser).insert([
      {
        id: '976e547f-d903-4dd8-9883-deac44ff024d',
        description: '',
        type: 'SuperAdmin',
      },
      {
        id: '07cf9294-b64c-41d2-9aee-5a80945edb8f',
        description: '',
        type: 'Admininstrador',
      },
      {
        id: 'f2fc9bd7-626e-4a6a-96bf-d1988a22af52',
        description: '',
        type: 'Gestor Geral',
      },
      {
        id: '76c0b4f1-d7bf-4c4c-956e-2af2ca54368e',
        description: '',
        type: 'Cordenador',
      },
      {
        id: '3818634c-739d-4ea3-b804-7a04d5efea8f',
        description: '',
        type: 'Colaborador',
      },
    ]);
    await queryRunner.connection.getRepository(User).insert([
      {
        id: 'dcbd6bd5-fa32-494c-b8d4-473eaa4ee427',
        cpf: '127.0.0.1',
        email: 'rafael.lechensque@gmail.com',
        name: 'Nulo',
        password:
          '$2b$10$kLRyPDxdMTYFGOKPIoyGNuccDguY0sWnqMGSVq5eT4TS7bv/qPqwe',
        typeUser: await queryRunner.connection
          .getRepository(TypesUser)
          .findOneBy({ id: '976e547f-d903-4dd8-9883-deac44ff024d' }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .getRepository(User)
      .delete('dcbd6bd5-fa32-494c-b8d4-473eaa4ee427');
    await queryRunner.connection
      .getRepository(TypesUser)
      .delete([
        '3818634c-739d-4ea3-b804-7a04d5efea8f',
        '76c0b4f1-d7bf-4c4c-956e-2af2ca54368e',
        'f2fc9bd7-626e-4a6a-96bf-d1988a22af52',
        '07cf9294-b64c-41d2-9aee-5a80945edb8f',
        '976e547f-d903-4dd8-9883-deac44ff024d',
      ]);
  }
}
