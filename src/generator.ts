import { ASTNodeTypes } from './parser'
import { TransformedNode } from './transformer'

export function generator(node: TransformedNode) {
  switch (node.type) {
    case ASTNodeTypes.Program:
      return node.body.map(generator).join('\n')
    case ASTNodeTypes.CallExpressionStatement:
      return generator(node.expression) + ';'
    case ASTNodeTypes.CallExpression:
      return `${generator(node.callee)}(${node.arguments.map(generator).join(', ')})`
    case ASTNodeTypes.Identifier:
      return node.name
    case ASTNodeTypes.NumberLiteral:
      return node.value
    case ASTNodeTypes.StringLiteral:
      return `"${node.value}"`
    default:
      throw new TypeError((<any>node).type)
  }
}
