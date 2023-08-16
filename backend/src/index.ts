import * as dotenv from 'dotenv';
import { app } from './app';
import connectDb from './db/connection';
import { requireEnvs } from './utils/require-envs';
dotenv.config({ path: `./.env` });
async function main() {
  const requiredEnvs = ['PORT', 'CLIENT_DOMAIN', 'MONGO_URI'];

  requireEnvs(requiredEnvs);

  const { PORT } = process.env;

  await connectDb();

  app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
}

main();
