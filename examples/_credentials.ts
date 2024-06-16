import { config } from "dotenv";
import { join } from "node:path";
// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

// Export the credentials.
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};
