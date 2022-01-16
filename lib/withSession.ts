import { GetServerSideProps, NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

export function withSession(handle: NextApiHandler | GetServerSideProps) {
  return withIronSession(handle, {
    password: process.env.SESSION_SECRET,
    cookieName: 'blog',
    cookieOptions: { secure: false, }
  });
}
