export const ensureLink = (link: string | null, removeSearchParams = false) => {
  if (!link) {
    return ''
  }

  link = link.replace(/^http:/, 'https:')
  link = link.replace(/^\/item/, 'https://baike.baidu.com/item')

  if (removeSearchParams) {
    link = link.split('?')[0]
  }

  return link
}
