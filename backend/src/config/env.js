import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5004;

export const MONGO_URL = process.env.MONGO_URL || '';
export const DB_NAME = process.env.DB_NAME;

export const SALT_ROUNDS = process.env.SALT_ROUNDS;
export const JWT_SECRET = process.env.JWT_SECRET;
