import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { Post } from './entity/Post';
import { User } from './entity/User';
import { Comment } from './entity/Comment';

createConnection().then(async connection => {
  console.log('Running seed...');
  const { manager } = connection;
  const u1 = new User();
  u1.username = 'Leo Cheung';
  u1.passwordDigest = 'xxx';
  await manager.save(u1);
  const post1 = new Post();
  post1.title = 'Post 1';
  post1.content = 'My first Post';
  post1.author = u1;
  await manager.save(post1);
  const c1 = new Comment();
  c1.user = u1;
  c1.post = post1;
  c1.content = 'Awesome!';
  await manager.save(c1);
  await connection.close();
  console.log('Seed ran successfully!!');
}).catch(error => console.log(error));
