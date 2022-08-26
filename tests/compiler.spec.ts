import { expect, test } from 'vitest'
import { compiler } from '../src/compiler'

test('compiler', () => {
  const input = `(repeat "abc" (add 1 2))`
  const output = `repeat("abc", add(1, 2));`
  expect(compiler(input)).toBe(output)
})