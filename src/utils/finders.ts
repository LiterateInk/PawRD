/**
 * Data on a route is contained into that single
 * variable in a script tag. Content is encoded in JSON, as a string.
 */
export const findAndReadGecData = <T extends {} = {}>(html: string): T => {
  const value = findValueBetween(html, "var gecData = {", "</script");
  return JSON.parse(value);
};

export const findValueBetween = (plain: string, start: string, end: string): string => {
  const startIndex = plain.indexOf(start) + start.length;
  const endIndex = plain.indexOf(end, startIndex);
  return plain.slice(startIndex, endIndex);
};
