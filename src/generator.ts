import { NodeTypes } from './parser'
import { TransformedNode } from './transformer'

export function generator(node: TransformedNode) {
  switch (node.type) {
    case NodeTypes.Program:
      return node.body.map(generator).join('\n')
    case NodeTypes.CallExpressionStatement:
      return generator(node.expression) + ';'
    case NodeTypes.CallExpression:
      return `${generator(node.callee)}(${node.arguments.map(generator).join(', ')})`
    case NodeTypes.Identifier:
      return node.name
    case NodeTypes.NumberLiteral:
      return node.value
    case NodeTypes.StringLiteral:
      return `"${node.value}"`
    default:
      throw new TypeError((<any>node).type)
  }
}
