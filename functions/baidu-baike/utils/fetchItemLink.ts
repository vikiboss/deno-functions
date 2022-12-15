const linkCache = new Map<string, string>()

const getSuggestApi = (item: string) => {
  return `https://baike.baidu.com/api/searchui/suggest?wd=${encodeURIComponent(item)}&enc=utf8`
}

export const fetchItemLink = async (itemName: string) => {
  if (linkCache.has(itemName)) {
    return linkCache.get(itemName) || ''
  }

  const res = await fetch(getSuggestApi(itemName))
  const { list } = await res.json()
  const item = list[0]

  if (!item) return ''

  const link = `https://baike.baidu.com/item/${item.lemmaTitle}/${item.lemmaId}`

  linkCache.set(itemName, link)

  return link
}
