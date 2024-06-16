/**
 * Convert a cookies object to a string.
 * Used for the "Cookie" header.
 */
export const cookiesObjectToString = (cookies: Record<string, string>): string => {
  return Object.entries(cookies)
    .map(([cookie, value]) => `${cookie}=${value}`)
    .join("; ");
};

/**
 * Map a list of "set-cookie" headers to an object.
 */
export const mapSetCookiesToObject = (setCookies: string[]): Record<string, string> => {
  const cookies: Record<string, string> = {};

  for (const setCookie of setCookies) {
    const [key, value] = setCookie.split(";")[0].split("=");
    cookies[key] = value;
  }

  return cookies;
};
