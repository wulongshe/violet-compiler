import { expect, test } from 'vitest'
import { tokenizer, TokenTypes } from '../src/tokenizer'

test('paren', () => {
  const code = `()`
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

test('name', () => {
  const code = `add`
  const tokens = [
    { type: TokenTypes.Name, value: 'add' },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = `22`
  const tokens = [
    { type: TokenTypes.Number, value: '22' },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

test('string', () => {
  const code = `"abc"`
  const tokens = [
    { type: TokenTypes.String, value: 'abc' },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

test('function', () => {
  const code = `(Add 12 -2)`
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'Add' },
    { type: TokenTypes.Number, value: '12' },
    { type: TokenTypes.Number, value: '-2' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})

test('tokenizer', () => {
  const code = `(add 2 (subtract 4 2))`
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  expect(tokenizer(code)).toEqual(tokens)
})
