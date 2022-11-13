import { ensureLink } from './ensureLink.ts'

const linkCache = new Map<string, string>()
const ResultLinkReg = /J-result-title" href="(.*)" target="/

const getSearchApi = (item: string) => {
  return `https://baike.baidu.com/search?word=${item}`
}

export const fetchItemLink = async (item: string) => {
  if (linkCache.has(item)) {
    return linkCache.get(item) || ''
  }

  const data = await fetch(getSearchApi(item))
  const html = await data.text()

  const link = ensureLink(ResultLinkReg.exec(html)?.[1] || '')

  if (link) {
    linkCache.set(item, link)
    return link
  }

  return ''
}
