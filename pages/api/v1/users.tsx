import { NextApiHandler } from 'next';
import md5 from 'md5';

import { getDatabaseConnection } from '../../../lib/getDatabaseConnection';
import { User } from '../../../src/entity/User';

const Users: NextApiHandler = async (req, res) => {
  const connection = await getDatabaseConnection();
  const { username, password, passwordConfirmation } = req.body;
  const errors = { username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[] };
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  const foundUser = connection.manager.find(User, { username });
  if (foundUser) {
    errors.username.push('用户名已存在');
  }
  if (!username.trim()) {
    errors.username.push('用户名不能为空');
  }
  if (!/[a-zA-Z0-9]/g.test(username.trim())) {
    errors.username.push('用户名格式不合法');
  }
  if (username.trim().length > 42) {
    errors.username.push('用户名太长');
  }
  if (username.trim().length < 3) {
    errors.username.push('用户名太短');
  }
  if (password === '') {
    errors.password.push('密码不能为空');
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('密码不匹配');
  }
  const hasError = Object.values(errors).find(error => error.length > 0);
  if (hasError) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};
export default Users;
