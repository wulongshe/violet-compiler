import { Node, NodeTypes, NumberLiteral, Program, StringLiteral } from './parser'
import { traverser } from './traverser'

export interface Identifier extends Node {
  type: NodeTypes.Identifier
  name: string
}
export interface TransformedCallExpressionStatement {
  type: NodeTypes.CallExpressionStatement
  expression: TransformedCallExpression
}
export interface TransformedCallExpression extends Node {
  type: NodeTypes.CallExpression
  callee: Identifier
  arguments: TransformedChildNode[]
}
export interface TransformedProgram extends Node {
  type: NodeTypes.Program
  body: TransformedChildNode[]
}
export type TransformedNode = TransformedProgram | TransformedCallExpressionStatement | TransformedCallExpression | StringLiteral | NumberLiteral | Identifier
export type TransformedParentNode = TransformedProgram | TransformedCallExpression | undefined
export type TransformedChildNode = StringLiteral | NumberLiteral | TransformedCallExpression | TransformedCallExpressionStatement

export function transformer(ast: Program) {
  const newAst: TransformedProgram = {
    type: NodeTypes.Program,
    body: []
  }
  ast.context = newAst.body

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type !== NodeTypes.CallExpression) return
        let expression: TransformedChildNode = {
          type: NodeTypes.CallExpression,
          callee: {
            type: NodeTypes.Identifier,
            name: node.name
          },
          arguments: []
        }
        node.context = expression.arguments
        if (parent?.type !== NodeTypes.CallExpression) {
          expression = {
            type: NodeTypes.CallExpressionStatement,
            expression
          }
        }
        parent?.context?.push(expression)
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type !== NodeTypes.NumberLiteral) return
        parent?.context?.push({
          type: NodeTypes.NumberLiteral,
          value: node.value
        })
      }
    },
    StringLiteral: {
      enter(node, parent) {
        if (node.type !== NodeTypes.StringLiteral) return
        parent?.context?.push({
          type: NodeTypes.StringLiteral,
          value: node.value
        })
      }
    }
  })

  return newAst
}
