import { serve } from '../../deps.ts'
import { dayjs } from './deps.ts'
import { fetchReadmeToHtml, PORT, responseWithJson } from '../../utils/index.ts'

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
  type: 'birth' | 'death' | 'event'
  link: string
}

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
      return responseWithJson(eventCache.get(today))
    } else {
      const res = await fetch(getHistoryApi(month))
      const monthEvents: Record<string, Record<string, HistoryItem[]>> = await res.json()
      const todayEvents = monthEvents?.[String(month)]?.[todayField] ?? []

      if (todayEvents.length) {
        eventCache.set(today, todayEvents)
      }

      return responseWithJson(todayEvents)
    }
  }

  if (pathname === '/item') {
    return responseWithJson({ status: 200 })

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
