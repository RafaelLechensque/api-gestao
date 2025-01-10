import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypesUser } from '../types-users/entities/types-user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ApiProperty({ example: 'Rafael' ,description:""})
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @ManyToOne((t) => TypesUser, { onDelete: 'SET NULL', nullable: false })
  typeUser: TypesUser;

  @Column({ nullable: false, default: true })
  isEnabled: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
