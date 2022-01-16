import { NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

export function withSession(handle: NextApiHandler) {
  return withIronSession(handle, {
    password: '7ad7ef72-fc8e-44d3-b0d4-76a18e991f8b',
    cookieName: 'blog',
    cookieOptions: { secure: false, }
  });
}
