import { NextApiHandler } from 'next';

import { getDatabaseConnection } from '../../../lib/getDatabaseConnection';

import { withSession } from '../../../lib/withSession';

import { Post } from '../../../src/entity/Post';


const Posts: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const connection = await getDatabaseConnection();
    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = req.session.get('currentUser');
    await connection.manager.save(post);
    res.json(post);
  }
};
export default withSession(Posts);
