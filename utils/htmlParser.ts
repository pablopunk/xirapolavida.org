import { parse } from 'node-html-parser'

export const parseParagraphs = (html: string) => {
  return parse(html).querySelectorAll('p')
}
