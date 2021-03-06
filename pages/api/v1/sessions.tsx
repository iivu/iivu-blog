import { NextApiHandler } from 'next';

import { withSession } from '../../../lib/withSession';
import { SignIn } from '../../../src/model/SignIn';

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.hasError()) {
    res.statusCode = 422;
    res.write(JSON.stringify(signIn.errors));
  } else {
    res.statusCode = 200;
    req.session.set('currentUser', signIn.user);
    await req.session.save();
    res.write(JSON.stringify(signIn.user));
  }
  res.end();
};

export default withSession(Sessions);
