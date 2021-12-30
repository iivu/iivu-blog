import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @ManyToOne(type => User, user => user.posts)
  author: User;

  @OneToMany(type => Comment, comment => comment.post)
  comments: Comment[];
}
