import { createConnection, getConnectionManager } from 'typeorm';

const connectionPromise = (async () => {
  const DEFAULT_CONNECTION_NAME = 'default';
  const manager = getConnectionManager();
  const hasDefaultConnection = manager.has(DEFAULT_CONNECTION_NAME);
  if (!hasDefaultConnection) {
    return createConnection();
  } else {
    return manager.get(DEFAULT_CONNECTION_NAME);
  }
})();

export const getDatabaseConnection = async () => connectionPromise;
