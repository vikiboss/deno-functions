const RegChars: [string, string][] = [
  ['&amp;amp;', '&'],
  ['&amp;', '&'],
  ['&gt;', '>'],
  ['&lt;', '<'],
  ['&nbsp;', ' '],
  ['&quot;', '"'],
  ['&apos;', "'"],
  ['&times;', '×'],
  ['&divide;', '÷'],
]

export const ensureTitle = (title: string) => {
  title = title.split('_')[0]

  RegChars.forEach((pair) => {
    const reg = new RegExp(pair[0], 'g')
    title = title.replace(reg, pair[1])
  })

  return title
}
