import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { Post } from './entity/Post';
import { User } from './entity/User';
import { Comment } from './entity/Comment';

createConnection().then(async connection => {
  console.log('Inserting a new user into the database...');
  const post = await connection.manager.find(Post);
  if (!post.length) {
    await connection.manager.save(
      Array(20).fill(1).map((_, index) => {
        return new Post(`Post${index + 1}`, `My ${index + 1} post`);
      })
    );
    console.log('Seed database successfully.');
  }
  await connection.close();
}).catch(error => console.log(error));
