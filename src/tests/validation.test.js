import { isValid } from '../validation'

describe('Validation tests', () => {
  test('isValid', () => {
    expect(isValid('a')).toBeTruthy()
    expect(isValid('abcd')).toBeTruthy()
    expect(isValid('ab-')).toBeTruthy()
    expect(isValid('-xy')).toBeTruthy()
    expect(isValid('a/b')).toBeTruthy()

    expect(isValid('123')).toBeFalsy()
    expect(isValid('9-')).toBeFalsy()
    expect(isValid('-dash-')).toBeFalsy()
    expect(isValid('qw/c')).toBeFalsy()
    expect(isValid('w/cd')).toBeFalsy()
    expect(isValid('-w/c')).toBeFalsy()
    expect(isValid('w/c-')).toBeFalsy()
  })
})