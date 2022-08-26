import { expect, test } from 'vitest'
import { parser, ASTNodeTypes } from '../src/parser'
import { TokenTypes } from '../src/tokenizer'

test('NumberLiteral', () => {
  const tokens = [
    { type: TokenTypes.Number, value: '2' },
  ]
  const ast = {
    type: ASTNodeTypes.Program,
    body: [{
      type: ASTNodeTypes.NumberLiteral,
      value: '2'
    }]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('CallExpression', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  const ast = {
    type: ASTNodeTypes.Program,
    body: [{
      type: ASTNodeTypes.CallExpression,
      name: 'add',
      params: [{
        type: ASTNodeTypes.NumberLiteral,
        value: '2'
      }, {
        type: ASTNodeTypes.NumberLiteral,
        value: '4'
      }]
    }]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('tow CallExpression', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '3' },
    { type: TokenTypes.Number, value: '5' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  const ast = {
    type: ASTNodeTypes.Program,
    body: [{
      type: ASTNodeTypes.CallExpression,
      name: 'add',
      params: [{
        type: ASTNodeTypes.NumberLiteral,
        value: '2'
      }, {
        type: ASTNodeTypes.NumberLiteral,
        value: '4'
      }]
    }, {
      type: ASTNodeTypes.CallExpression,
      name: 'add',
      params: [{
        type: ASTNodeTypes.NumberLiteral,
        value: '3'
      }, {
        type: ASTNodeTypes.NumberLiteral,
        value: '5'
      }]
    }]
  }
  expect(parser(tokens)).toEqual(ast)
})

test('parser', () => {
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
  const ast = {
    type: ASTNodeTypes.Program,
    body: [{
      type: ASTNodeTypes.CallExpression,
      name: 'add',
      params: [{
        type: ASTNodeTypes.NumberLiteral,
        value: '2'
      }, {
        type: ASTNodeTypes.CallExpression,
        name: 'subtract',
        params: [{
          type: ASTNodeTypes.NumberLiteral,
          value: '4'
        }, {
          type: ASTNodeTypes.NumberLiteral,
          value: '2'
        }]
      }]
    }]
  }
  expect(parser(tokens)).toEqual(ast)
})
