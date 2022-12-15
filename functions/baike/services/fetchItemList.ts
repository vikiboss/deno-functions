import { ensureLink } from '../utils/ensureLink.ts'
import { ensureTitle } from '../utils/ensureTitle.ts'
import { fetchItemLink } from '../utils/fetchItemLink.ts'
import { responseWithBaseRes } from '../utils/responseWithBaseRes.ts'

interface MeaningItem {
  title: string
  link: string
}

interface BaikeItem {
  item: string
  list: MeaningItem[]
}

const titleReg = /og:title" content="(.*)"/
const itemReg = /class="item">(.*)</g
const itemSelectedReg = /"selected">(.*)</
const itemLinkReg = /a title="(.*)" href='(.*)'/

const itemListCache = new Map<string, BaikeItem>()

export const getItemList = async (inputItem: string) => {
  if (itemListCache.has(inputItem)) {
    return itemListCache.get(inputItem) as BaikeItem
  }

  const currentLink = await fetchItemLink(inputItem)

  if (!currentLink) {
    return null
  }

  const html = await (await fetch(currentLink)).text()
  const item = titleReg.exec(html)?.[1]?.split('_')[0] ?? ''

  const matches = Array.from(html.matchAll(itemReg)).filter((e) => !!e)

  const items = matches.map((e) => {
    const [_, subTitle, link] = itemLinkReg.exec(e[1] || '') ?? []

    if (!subTitle || !link) {
      const currntTitle = itemSelectedReg.exec(e[1])?.[1] ?? ''
      return { title: ensureTitle(currntTitle), link: ensureLink(currentLink, true) }
    } else {
      return { title: ensureTitle(subTitle), link: ensureLink(link, true) }
    }
  })

  if (items.length === 0) {
    items.unshift({
      title: encodeURIComponent(ensureTitle(item)),
      link: ensureLink(currentLink, true),
    })
  }

  const itemInfo = { item: decodeURIComponent(inputItem), list: items }

  itemListCache.set(inputItem, itemInfo)

  return itemInfo
}

export const fetchItemList = async (inputItem: string, encoding = 'json') => {
  const itemListInfo = await getItemList(inputItem)

  if (!itemListInfo) {
    if (encoding === 'text') {
      return new Response('词条不存在')
    } else {
      return responseWithBaseRes({}, 404, '词条不存在')
    }
  }

  if (encoding === 'text') {
    return new Response(itemListInfo.list.map((e, i) => `${i + 1}. ${e.title}`).join('\n'))
  } else {
    return responseWithBaseRes(itemListInfo)
  }
}
