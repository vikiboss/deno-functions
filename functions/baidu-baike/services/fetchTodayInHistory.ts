import { dayjs } from '../deps.ts'
import { responseWithBaseRes } from '../../../utils/responseWithBaseRes.ts'

interface HistoryItem {
  title: string
  year: string
  date: string
  desc: string
  type: 'birth' | 'death' | 'event'
  link: string
}

type AnyObject<T = any> = Record<number | string | symbol, T>

const eventCache = new Map<string, HistoryItem[]>()

/** get history api link */
const getHistoryApi = () => {
  const month = new Date().getMonth() + 1
  const filename = `${String(month).padStart(2, '0')}.json`
  return `https://baike.baidu.com/cms/home/eventsOnHistory/${filename}`
}

/** remove all html elements and escape NCR (Numeric Character Reference) */
const transformChars = (text: string) => {
  return text.replace(/<.*?>/g, '').replace(/&#(\d+);/g, (_, $1) => String.fromCharCode($1))
}

const formatOutput = (items: HistoryItem[] = []) => {
  return items.map((e) => `${e.year}年 ${e.title}`).join('\n')
}

export const fetchTodayInHistory = async (encoding = 'json') => {
  const now = dayjs()
  const today = now.format(`YYYY/M/D`)
  const todayField = now.format('MMDD')
  const monthAndDay = now.format('M-D')

  if (eventCache.has(today)) {
    if (encoding === 'text') {
      return new Response(formatOutput(eventCache.get(today)))
    } else {
      return responseWithBaseRes(eventCache.get(today))
    }
  }

  const res = await fetch(getHistoryApi())
  const monthEvents: AnyObject<AnyObject<AnyObject[]>> = await res.json()
  const todayEvents = monthEvents?.[String(now.month() + 1)]?.[todayField] ?? []

  todayEvents.sort((a, b) => a.year - b.year)

  const modifiedTodayEvents = todayEvents.map((e) => {
    let desc = transformChars(e.desc as string)

    if (!desc.endsWith('.') && !desc.endsWith('。')) desc += '...'

    return {
      title: transformChars(e.title as string),
      year: e.year as string,
      date: monthAndDay,
      desc: desc,
      type: e.type as 'birth' | 'death' | 'event',
      link: e.link as string,
    }
  })

  eventCache.set(today, modifiedTodayEvents)

  if (encoding === 'text') {
    return new Response(formatOutput(eventCache.get(today)))
  } else {
    return responseWithBaseRes(eventCache.get(today))
  }
}
