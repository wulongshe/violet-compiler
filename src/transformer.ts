import { Node, ASTNodeTypes, NumberLiteral, Program, StringLiteral } from './parser'
import { traverser } from './traverser'

export interface Identifier extends Node {
  type: ASTNodeTypes.Identifier
  name: string
}
export interface TransformedCallExpressionStatement {
  type: ASTNodeTypes.CallExpressionStatement
  expression: TransformedCallExpression
}
export interface TransformedCallExpression extends Node {
  type: ASTNodeTypes.CallExpression
  callee: Identifier
  arguments: TransformedChildNode[]
}
export interface TransformedProgram extends Node {
  type: ASTNodeTypes.Program
  body: TransformedChildNode[]
}
export type TransformedNode = TransformedProgram | TransformedCallExpressionStatement | TransformedCallExpression | StringLiteral | NumberLiteral | Identifier
export type TransformedParentNode = TransformedProgram | TransformedCallExpression | undefined
export type TransformedChildNode = StringLiteral | NumberLiteral | TransformedCallExpression | TransformedCallExpressionStatement

export function transformer(ast: Program) {
  const newAst: TransformedProgram = {
    type: ASTNodeTypes.Program,
    body: []
  }
  ast.context = newAst.body

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type !== ASTNodeTypes.CallExpression) return
        let expression: TransformedChildNode = {
          type: ASTNodeTypes.CallExpression,
          callee: {
            type: ASTNodeTypes.Identifier,
            name: node.name
          },
          arguments: []
        }
        node.context = expression.arguments
        if (parent?.type !== ASTNodeTypes.CallExpression) {
          expression = {
            type: ASTNodeTypes.CallExpressionStatement,
            expression
          }
        }
        parent?.context?.push(expression)
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type !== ASTNodeTypes.NumberLiteral) return
        parent?.context?.push({
          type: ASTNodeTypes.NumberLiteral,
          value: node.value
        })
      }
    },
    StringLiteral: {
      enter(node, parent) {
        if (node.type !== ASTNodeTypes.StringLiteral) return
        parent?.context?.push({
          type: ASTNodeTypes.StringLiteral,
          value: node.value
        })
      }
    }
  })

  return newAst
}
