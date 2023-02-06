import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const PORT = Number(process.env.PORT) ? Number(process.env.PORT) : 4000;
