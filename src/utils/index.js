/**
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone (source) {
  return JSON.parse(JSON.stringify(source))
}
