/**
 * @description isEmpty checks if the given data is empty/null/undefined.
 * It will check for all the objects accepted in javascript.
 * @param value can be of type any.
 * @returns boolean - True if Given Data is Empty.
 */
 export const isEmptyData = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else if (value !== null && Array.isArray(value) && !value.length) {
    return true;
  }else {
    return false;
  }
};
