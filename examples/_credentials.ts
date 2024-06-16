import { config } from "dotenv";
import { join } from "node:path";
import { readFile, writeFile } from "fs/promises";

// Load the `.env` file configuration.
config({ path: join(__dirname, ".env") });

// Export the credentials.
export const credentials = {
  pawnoteNextTimeToken: process.env.PAWNOTE_TOKEN,
  pawnoteDeviceUUID: process.env.PAWNOTE_DEVICE_UUID,
  pawnoteUsername: process.env.PAWNOTE_USERNAME,
  pawnoteURL: process.env.PAWNOTE_URL,
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};

export const updatePawnoteToken = async (token: string): Promise<void> => {
  const path = join(__dirname, ".env");
  const content = await readFile(path, "utf-8");
  const contentWithoutToken = content.replace(/PAWNOTE_TOKEN=[^\n]*/, "");
  await writeFile(path, contentWithoutToken + `PAWNOTE_TOKEN="${token}"`);
};
