import mongoose from 'mongoose';

import {
  DB_NAME,
  MONGO_URL,
} from './env.js';

const dbConnection = async () => {
  try {
    mongoose.connect(MONGO_URL, {
      dbName: DB_NAME,
    });

    console.log('Database Connected!!!');
  } catch (error) {
    console.error(`Error occuring while building connection with Database ${error}`);
  }
}

export default dbConnection;
