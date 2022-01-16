/// <reference types="next" />
/// <reference types="next/types/global" />

import * as next from 'next';
import { Session } from 'next-iron-session';

declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'next' {
  interface NextApiRequest {
    session: Session;
  }
}

type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  htmlContent: string;
}

