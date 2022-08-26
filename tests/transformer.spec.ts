import { expect, test } from 'vitest'
import { ASTNodeTypes, Program } from '../src/parser'
import { TransformedProgram, transformer } from '../src/transformer'

test('transformer', () => {
  const originalAST: Program = {
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

  expect(transformer(originalAST)).toEqual(transformedAST)
})
