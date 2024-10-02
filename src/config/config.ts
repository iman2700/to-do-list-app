export default () => ({
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/todo-list-db',
    JWT_SECRET: process.env.JWT_SECRET || 'secretKey', // Define JWT secret
    JWT_EXPIRES_IN: '1h',
  });
  