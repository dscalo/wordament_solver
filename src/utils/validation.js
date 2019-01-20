
/**
 * constraints
 * only letters
 * dashes at the beginning or end (not both)
 * / allowed if and only if it has exactly one char before and after it
 *
 */
const re = /(^\w\/\w$)|(^[a-zA-z]*$)|(^[a-zA-Z-][a-zA-Z]+$)|(^[a-zA-Z]+[a-zA-Z-]$)/

export const isValid = str => str.length > 0 && re.test(str)