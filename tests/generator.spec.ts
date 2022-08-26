import { expect, test } from 'vitest'
import { generator } from '../src/generator'
import { ASTNodeTypes } from '../src/parser'
import { TransformedProgram } from '../src/transformer'

test('generator', () => {
  const transformedAST: TransformedProgram = {
    type: ASTNodeTypes.Program,
    body: [{
      type: ASTNodeTypes.CallExpressionStatement,
      expression: {
        type: ASTNodeTypes.CallExpression,
        callee: {
          type: ASTNodeTypes.Identifier,
          name: 'add'
        },
        arguments: [{
          type: ASTNodeTypes.NumberLiteral,
          value: '2',
        }, {
          type: ASTNodeTypes.CallExpression,
          callee: {
            type: ASTNodeTypes.Identifier,
            name: 'subtract',
          },
          arguments: [{
            type: ASTNodeTypes.NumberLiteral,
            value: '4'
          }, {
            type: ASTNodeTypes.NumberLiteral,
            value: '2'
          }]
        }]
      },
    }]
  }
  const output = `add(2, subtract(4, 2));`
  expect(generator(transformedAST)).toBe(output)
})

test('repeat and add', () => {
  const transformedAST: TransformedProgram = {
    type: ASTNodeTypes.Program,
    body: [{
      type: ASTNodeTypes.CallExpressionStatement,
      expression: {
        type: ASTNodeTypes.CallExpression,
        callee: {
          type: ASTNodeTypes.Identifier,
          name: 'repeat'
        },
        arguments: [{
          type: ASTNodeTypes.StringLiteral,
          value: 'abcd',
        }, {
          type: ASTNodeTypes.CallExpression,
          callee: {
            type: ASTNodeTypes.Identifier,
            name: 'add',
          },
          arguments: [{
            type: ASTNodeTypes.NumberLiteral,
            value: '1'
          }, {
            type: ASTNodeTypes.NumberLiteral,
            value: '2'
          }]
        }]
      },
    }]
  }
  const output = `repeat("abcd", add(1, 2));`
  expect(generator(transformedAST)).toBe(output)
})
