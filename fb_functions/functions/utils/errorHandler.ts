/**
 * @param {number} response.status 
 * @return {boolean}
 */
export const isErrorInstance = (response: any): boolean => {
  if (!response) {
    return false
  }
  return response instanceof Error
}
