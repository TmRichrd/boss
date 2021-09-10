import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('c_resume')
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: true })
  advantage: string;
}
