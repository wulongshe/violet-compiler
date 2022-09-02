import { NodeTypes, Program, ChildNode, ParentNode } from './parser'

export type MethodFn = (node: ChildNode | Program, parent?: ParentNode) => void

export interface VisitorOption {
  enter?: MethodFn
  exit?: MethodFn
}
export type Visitor = {
  [key in keyof typeof NodeTypes]?: VisitorOption
}

export function traverseArray(array: ChildNode[], parent: ParentNode, visitor: Visitor) {
  for (const child of array) {
    traverseNode(child, parent, visitor)
  }
}

export function traverseNode(node: ChildNode | Program, parent: ParentNode, visitor: Visitor) {
  const visitorObj = visitor[NodeTypes[node.type]]
  visitorObj?.enter?.(node, parent)
  switch (node.type) {
    case NodeTypes.NumberLiteral:
      break
    case NodeTypes.StringLiteral:
      break
    case NodeTypes.CallExpression:
      traverseArray(node.params, node, visitor)
      break
    case NodeTypes.Program:
      traverseArray(node.body, node, visitor)
      break
  }
  visitorObj?.exit?.(node, parent)
}

export function traverser(ast: Program, visitor: Visitor) {
  traverseNode(ast, void 0, visitor)
}
