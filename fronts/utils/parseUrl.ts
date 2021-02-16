/**
 * @param domain string
 * @param queries 
 * @returns string
 */
export const parseUrl = (domain: string, queries?): string => {
  return domain + '?' + Object.keys(queries).reduce((arr: string, cur: string) => arr + `&${cur}=${queries[cur]}`, '')
}
