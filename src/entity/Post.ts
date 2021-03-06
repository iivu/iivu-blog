import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { User } from './User';
import { Comment } from './Comment';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  content: string;

  @Column('int')
  authorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne('User', 'posts')
  author: User;

  @OneToMany('Comment', 'post')
  comments: Comment[];
}
