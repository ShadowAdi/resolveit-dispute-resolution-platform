import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;