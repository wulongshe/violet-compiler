import { Token, TokenTypes } from './tokenizer'
import { TransformedChildNode } from './transformer'

export enum NodeTypes {
  Program = 'Program',
  Identifier = 'Identifier',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  CallExpression = 'CallExpression',
  CallExpressionStatement = 'CallExpressionStatement',
}
export interface Node {
  type: NodeTypes
}
export interface NumberLiteral extends Node {
  type: NodeTypes.NumberLiteral
  value: string
}
export interface StringLiteral extends Node {
  type: NodeTypes.StringLiteral
  value: string
}
export interface CallExpression extends Node {
  type: NodeTypes.CallExpression
  name: string
  params: ChildNode[]
  context?: TransformedChildNode[]
}
export interface Program extends Node {
  type: NodeTypes.Program
  body: ChildNode[]
  context?: TransformedChildNode[]
}
export type ParentNode = Program | CallExpression | undefined
export type ChildNode = StringLiteral | NumberLiteral | CallExpression

export function createProgram(): Program {
  return { type: NodeTypes.Program, body: [] }
}
export function createNumberLiteral(value: string): NumberLiteral {
  return { type: NodeTypes.NumberLiteral, value }
}
export function createStringLiteral(value: string): StringLiteral {
  return { type: NodeTypes.StringLiteral, value }
}
export function createCallExpression(name: string): CallExpression {
  return { type: NodeTypes.CallExpression, name, params: [] }
}

export function parser(tokens: Token[]): Program {
  let current = 0, token: Token

  function walk(): ChildNode {
    token = tokens[current++]
    // NumberLiteral
    if (token.type === TokenTypes.Number) {
      return createNumberLiteral(token.value)
    }
    // StringLiteral
    if (token.type === TokenTypes.String) {
      return createStringLiteral(token.value)
    }
    // CallExpression
    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[current++]
      const node = createCallExpression(token.value)
      while ((
        token = tokens[current],
        !(token.type === TokenTypes.Paren && token.value === ')')
      )) { node.params.push(walk()) }
      current++
      return node
    }
    // throw Error
    throw new TypeError(token.type)
  }

  const program = createProgram()
  while (current < tokens.length) {
    program.body.push(walk())
  }
  return program
}
