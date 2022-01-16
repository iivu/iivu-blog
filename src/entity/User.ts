import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import md5 from 'md5';

import { Post } from './Post';
import { Comment } from './Comment';

import { getDatabaseConnection } from '../../lib/getDatabaseConnection';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  passwordDigest: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Post, post => post.author)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  errors: { username: string[], password: string[], passwordConfirmation: string[] } = {
    username: [],
    password: [],
    passwordConfirmation: []
  };
  password: string;
  passwordConfirmation: string;

  async validate() {
    const connection = await getDatabaseConnection();
    const foundUser = await connection.manager.find(User, { username: this.username });
    if (foundUser && foundUser.length > 0) {
      console.log(foundUser);
      this.errors.username.push('用户名已存在');
    }
    if (!this.username.trim()) {
      this.errors.username.push('用户名不能为空');
    }
    if (!/[a-zA-Z0-9]/g.test(this.username.trim())) {
      this.errors.username.push('用户名格式不合法');
    }
    if (this.username.trim().length > 42) {
      this.errors.username.push('用户名太长');
    }
    if (this.username.trim().length < 3) {
      this.errors.username.push('用户名太短');
    }
    if (this.password === '') {
      this.errors.password.push('密码不能为空');
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.passwordConfirmation.push('密码不匹配');
    }
  }

  hasError(): boolean {
    return !!Object.values(this.errors).find(error => error.length > 0);
  }
}
