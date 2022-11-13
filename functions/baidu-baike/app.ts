import { serve } from '../../deps.ts'
import { dayjs } from './deps.ts'
import { fetchReadmeToHtml, PORT, responseWithBaseRes } from '../../utils/index.ts'

interface MeaningItem {
  title: string
  shortDesc: string
}

interface BaikeItem {
  name: string
  cover: string
  description: string
  meanings: MeaningItem[]
  updateTime: string
  link: string
}

interface HistoryItem {
  title: string
  year: string
  desc: string
  type: 'birth' | 'death' | 'event'
  link: string
}

type AnyObject<T = any> = Record<number | string | symbol, T>

// const itemCache = new Map<string, BaikeItem>()
const eventCache = new Map<string, HistoryItem[]>()

const getHistoryApi = (month: number) => {
  const filename = `${String(month).padStart(2, '0')}.json`
  return `https://baike.baidu.com/cms/home/eventsOnHistory/${filename}`
}

async function handleRequest(request: Request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  if (pathname === '/') {
    return await fetchReadmeToHtml(import.meta.url)
  }

  if (pathname === '/today_in_history') {
    const now = new Date()
    const today = dayjs(now).format('YYYY-MM-DD')
    const todayField = dayjs(now).format('MMDD')
    const month = now.getMonth() + 1

    if (eventCache.has(today)) {
      return responseWithBaseRes(eventCache.get(today))
    } else {
      const res = await fetch(getHistoryApi(month))
      const monthEvents: AnyObject<AnyObject<AnyObject[]>> = await res.json()
      const todayEvents = monthEvents?.[String(month)]?.[todayField] ?? []

      const modifiedTodayEvents = todayEvents.map((e) => ({
        title: (e.title as string).replace(/<.*?>/g, ''),
        year: e.year as string,
        desc: (e.desc as string).replace(/<.*?>/g, ''),
        type: e.type as 'birth' | 'death' | 'event',
        link: e.link as string,
      }))

      if (todayEvents.length) {
        eventCache.set(today, modifiedTodayEvents)
      }

      return responseWithBaseRes(todayEvents)
    }
  }

  if (pathname === '/item') {
    return responseWithBaseRes({}, 500, 'not implement yet for now')

    // const params = url.searchParams
    // const item = decodeURIComponent(params.get('item') ?? '').trim()

    // if (!item) {
    //   return await fetchReadmeToHtml(import.meta.url)
    // }

    // const encode = params.get('encode') || 'json'
    // const n = params.get('n') || '1'

    // if (!cache.has(word)) {
    //   cache.set(word, word);
    // }
  }

  return await fetchReadmeToHtml(import.meta.url)
}

serve(handleRequest, { port: PORT })
