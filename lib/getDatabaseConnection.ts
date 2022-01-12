import 'reflect-metadata';
import { createConnection, getConnectionManager } from 'typeorm';

import { Post } from '../src/entity/Post';
import { User } from '../src/entity/User';
import { Comment } from '../src/entity/Comment';

import config from 'ormconfig.json';

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post, User, Comment]
  });
};

const connectionPromise = (async () => {
  const DEFAULT_CONNECTION_NAME = 'default';
  const manager = getConnectionManager();
  const hasDefaultConnection = manager.has(DEFAULT_CONNECTION_NAME);
  if (hasDefaultConnection) {
    const connection = manager.get(DEFAULT_CONNECTION_NAME);
    await connection.close();
  }
  return create();
})();

export const getDatabaseConnection = async () => connectionPromise;
