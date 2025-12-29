// backend/src/config/env.js
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'YOUTUBE_API_KEY',
  'CLIENT_URL',
  'NODE_ENV',
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const env = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  clientUrl: process.env.CLIENT_URL,
  nodeEnv: process.env.NODE_ENV,
};

export default env;
