export enum TokenTypes {
  Whitespace = 'whitespace',
  Paren = 'paren',
  Name = 'name',
  Number = 'number',
  String = 'string',
}

export interface Token {
  type: TokenTypes
  value: string
}

const isParen = (ch: string) => /[\(\)]/.test(ch)
const isLetter = (ch: string) => /[a-z]/i.test(ch)
const isNumber = (ch: string) => /[0-9]/i.test(ch)
const isSign = (ch: string) => /[-+]/i.test(ch)
const isQuote = (ch: string) => /"/.test(ch)
const isWhitespace = (ch: string) => /\s/.test(ch)
export function tokenizer(code: string): Token[] {
  let start = 0, current = 0, char: string
  const tokens: Token[] = []

  while (current < code.length) {
    char = code.charAt(current)
    if (isWhitespace(char)) {
      start = ++current
      continue
    }
    // paren
    if (isParen(char)) {
      tokens.push({
        type: TokenTypes.Paren,
        value: char
      })
      start = ++current
      continue
    }
    // name
    if (isLetter(char)) {
      char = code.charAt(++current)
      while (
        current < code.length &&
        (isLetter(char) || isNumber(char))
      ) { char = code.charAt(++current) }
      tokens.push({
        type: TokenTypes.Name,
        value: code.slice(start, current)
      })
      start = current
      continue
    }
    // number
    if (isNumber(char) || isSign(char)) {
      char = code.charAt(++current)
      while (
        current < code.length &&
        isNumber(char)
      ) { char = code.charAt(++current) }
      tokens.push({
        type: TokenTypes.Number,
        value: code.slice(start, current)
      })
      start = current
      continue
    }
    // string
    if (isQuote(char)) {
      char = code.charAt(++current)
      while (
        current < code.length &&
        !isQuote(char)
      ) { char = code.charAt(++current) }
      tokens.push({
        type: TokenTypes.String,
        value: code.slice(start + 1, current)
      })
      start = ++current
      continue
    }
    throw new Error('I do not know what this character is: ' + char)
  }
  return tokens
}
