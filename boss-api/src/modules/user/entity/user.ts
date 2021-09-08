import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel('c_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable:true})
  password: string;

  @Column()
  sex: number;

  @Column()
  email: string;

  @Column({ type: 'datetime' })
  createTime: Date;

  @Column()
  headImg: string; // 头像

  @Column()
  identity: number; //身份 职场人 ：学生,

  @Column()
  type: number; // 牛人 : boss

  @Column()
  status: number; // 状态 启用：封禁

  @Column({ type: 'datetime',nullable:true })
  joinWorkTime: Date;

  @Column({nullable:true})
  wxId: string;

  @Column({ type: 'datetime',nullable:true })
  birthday: Date;

  @Column({nullable:true})
  resumeId: string; // 在线简历Id

  @Column({nullable:true})
  fileresumeId: string; // 上传文件简历Id

  @Column({nullable:true})
  collectionId: string; // 收藏id

  @Column({nullable:true})
  chatHistoryId: string; // 沟通记录
}
