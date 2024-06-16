import { credentials, updatePawnoteToken } from "./_credentials";
import { authenticateToken, PronoteApiAccountId } from "pawnote";
import { Authenticator } from "../src";

void async function main () {
  // Authenticate the PRONOTE account using a token (simpler for us here)
  const pronote = await authenticateToken(credentials.pawnoteURL!, {
    accountTypeID: PronoteApiAccountId.Student,
    deviceUUID: credentials.pawnoteDeviceUUID!,
    token: credentials.pawnoteNextTimeToken!,
    username: credentials.pawnoteUsername!
  });

  // Update the token in ".env" for the next time.
  await updatePawnoteToken(pronote.nextTimeToken);

  // Read ARD constants from the PRONOTE home page.
  const { ard } = await pronote.getHomePage();
  if (!ard) throw new Error("No ARD found");
  // Request a ticket URL for ARD from PRONOTE.
  const ticketURL = await ard.fetchURL();

  // Initialize the ARD client.
  const authenticator = new Authenticator();
  // Authenticate the ARD client using the PRONOTE ticket URL.
  const client = await authenticator.fromPronoteTicket(ticketURL);

  // Do whatever you want with the "client" instance !
  console.log("Connected to ARD for", client.schoolID);
}();
