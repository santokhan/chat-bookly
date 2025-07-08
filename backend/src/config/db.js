import mongoose from 'mongoose';

import {
  MONGO_URL,
  DB_NAME,
} from './env';

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
