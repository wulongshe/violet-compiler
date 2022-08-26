import { generator } from './generator'
import { parser } from './parser'
import { tokenizer } from './tokenizer'
import { transformer } from './transformer'

export function compiler(input: string): string {
  const tokens = tokenizer(input)
  const ast = parser(tokens)
  const newAst = transformer(ast)
  const output = generator(newAst)
  return output
}