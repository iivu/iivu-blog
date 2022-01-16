import md5 from 'md5';

import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { User } from '../entity/User';

export class SignIn {
  username: string;
  password: string;
  errors: { username: string[], password: string[] } = { username: [], password: [] };
  user: User;

  async validate() {
    const connection = await getDatabaseConnection();
    if (!this.username.trim()) {
      this.errors.username.push('请填写用户名');
    }
    const user = await connection.manager.findOne(User, { where: { username: this.username } });
    if (user) {
      this.user = user;
      if (user.passwordDigest !== md5(this.password)) {
        this.errors.password.push('密码不匹配');
      }
    } else {
      this.errors.username.push('用户名不存在');
    }
  }

  hasError(): boolean {
    return !!Object.values(this.errors).find(v => v.length > 0);
  }

}
