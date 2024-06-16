import { cookiesObjectToString, mapSetCookiesToObject } from "~/utils/cookies";
import { ARD_HOST } from "~/utils/constants";
import { Client } from "~/models/Client";

export class Authenticator {
  /**
   * Authenticates the user using a ticket coming from PRONOTE.
   * @param pronoteTicketURL The URL of the PRONOTE ticket.
   *
   * @example
   * // Example URL that could be given by PRONOTE.
   * const pronoteTicketURL = "https://services.ard.fr/fr/espaces-clients/etablissements/pronote.html?ticket=ST-123456789012345678912346789";
   *
   * const authenticator = new Authenticator();
   * const client = await authenticator.fromPronoteTicket(pronoteTicketURL);
   */
  public async fromPronoteTicket (pronoteTicketURL: string) {
    let redirectedURL: string;
    let response: Response;
    let cookies: Record<string, string> = {};

    response = await fetch(pronoteTicketURL, {
      redirect: "manual"
    });

    redirectedURL = response.headers.get("location")!;
    cookies = mapSetCookiesToObject(response.headers.getSetCookie());

    response = await fetch(redirectedURL, {
      headers: {
        "Cookie": cookiesObjectToString(cookies)
      },
      redirect: "manual"
    });

    redirectedURL = ARD_HOST + response.headers.get("location")!;
    cookies = { ...cookies, ...mapSetCookiesToObject(response.headers.getSetCookie()) };
    if (!("fe_typo_user" in cookies)) throw new Error("Bad authentication.");

    response = await fetch(redirectedURL, {
      headers: {
        "Cookie": cookiesObjectToString(cookies)
      },
      redirect: "manual"
    });

    const html = await response.text();
    return Client.fromAPI(html, cookies);
  }
}
