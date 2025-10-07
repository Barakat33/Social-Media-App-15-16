import { config } from "dotenv";

config(); // حمّل ملف env من المسار الصح

export const devConfig = {
PORT: process.env.PORT,
DB_URL: process.env.DB_URL,
EMAIL_USER: process.env.EMAIL_USER,
EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
API_KEY: process.env.API_KEY,
API_SECRET: process.env.API_SECRET,
CLOUD_NAME: process.env.CLOUD_NAME,
JWT_SECRET: process.env.JWT_SECRET,
};
