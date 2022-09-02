import { expect, test } from 'vitest'
import { generator } from '../src/generator'
import { NodeTypes } from '../src/parser'
import { TransformedProgram } from '../src/transformer'

test('generator', () => {
  const transformedAST: TransformedProgram = {
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.CallExpressionStatement,
      expression: {
        type: NodeTypes.CallExpression,
        callee: {
          type: NodeTypes.Identifier,
          name: 'add'
        },
        arguments: [{
          type: NodeTypes.NumberLiteral,
          value: '2',
        }, {
          type: NodeTypes.CallExpression,
          callee: {
            type: NodeTypes.Identifier,
            name: 'subtract',
          },
          arguments: [{
            type: NodeTypes.NumberLiteral,
            value: '4'
          }, {
            type: NodeTypes.NumberLiteral,
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
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.CallExpressionStatement,
      expression: {
        type: NodeTypes.CallExpression,
        callee: {
          type: NodeTypes.Identifier,
          name: 'repeat'
        },
        arguments: [{
          type: NodeTypes.StringLiteral,
          value: 'abcd',
        }, {
          type: NodeTypes.CallExpression,
          callee: {
            type: NodeTypes.Identifier,
            name: 'add',
          },
          arguments: [{
            type: NodeTypes.NumberLiteral,
            value: '1'
          }, {
            type: NodeTypes.NumberLiteral,
            value: '2'
          }]
        }]
      },
    }]
  }
  const output = `repeat("abcd", add(1, 2));`
  expect(generator(transformedAST)).toBe(output)
})
