
/*
  0   1   2   3
  4   5   6   7
  8   9  10  11
  12  13 14  15
*/

export const directionOf = base => (start, end) => {
  if (start - base === end) return 0
  if (start - base + 1 === end) return 45
  if (start + 1 === end) return 90
  if (start + base + 1 === end) return 135
  if (start + base === end) return 180
  if (start + base -1 === end) return 225
  if (start - 1 === end) return 270
  if (start - base - 1 === end) return 315
  return -1
}