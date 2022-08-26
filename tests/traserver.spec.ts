import { expect, test } from 'vitest'
import { ASTNodeTypes, Program } from '../src/parser'
import { traverser, Visitor } from '../src/traverser'

test('traverser', () => {
  const ast: Program = {
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
  const callArr: [string, ASTNodeTypes, ASTNodeTypes | undefined][] = []
  const visitor: Visitor = {
    Program: {
      enter(node, parent) {
        callArr.push(['Program-enter', node.type, parent?.type])
      },
      exit(node, parent) {
        callArr.push(['Program-exit', node.type, parent?.type])
      }
    },
    CallExpression: {
      enter(node, parent) {
        callArr.push(['CallExpression-enter', node.type, parent!.type])
      },
      exit(node, parent) {
        callArr.push(['CallExpression-exit', node.type, parent!.type])
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        callArr.push(['NumberLiteral-enter', node.type, parent!.type])
      },
      exit(node, parent) {
        callArr.push(['NumberLiteral-exit', node.type, parent!.type])
      }
    }
  }
  traverser(ast, visitor)
  expect(callArr).toEqual([
    ['Program-enter', ASTNodeTypes.Program, undefined],
    ['CallExpression-enter', ASTNodeTypes.CallExpression, ASTNodeTypes.Program],
    ['NumberLiteral-enter', ASTNodeTypes.NumberLiteral, ASTNodeTypes.CallExpression],
    ['NumberLiteral-exit', ASTNodeTypes.NumberLiteral, ASTNodeTypes.CallExpression],
    ['CallExpression-enter', ASTNodeTypes.CallExpression, ASTNodeTypes.CallExpression],
    ['NumberLiteral-enter', ASTNodeTypes.NumberLiteral, ASTNodeTypes.CallExpression],
    ['NumberLiteral-exit', ASTNodeTypes.NumberLiteral, ASTNodeTypes.CallExpression],
    ['NumberLiteral-enter', ASTNodeTypes.NumberLiteral, ASTNodeTypes.CallExpression],
    ['NumberLiteral-exit', ASTNodeTypes.NumberLiteral, ASTNodeTypes.CallExpression],
    ['CallExpression-exit', ASTNodeTypes.CallExpression, ASTNodeTypes.CallExpression],
    ['CallExpression-exit', ASTNodeTypes.CallExpression, ASTNodeTypes.Program],
    ['Program-exit', ASTNodeTypes.Program, undefined],
  ])
})
