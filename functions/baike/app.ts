import { fetchItem } from './services/fetchItem.ts'
import { fetchItemList } from './services/fetchItemList.ts'
import { fetchReadmeToHtml } from '../../utils/index.ts'
import { fetchTodayInHistory } from './services/fetchTodayInHistory.ts'

Deno.serve(async (request: Request) => {
  const url = new URL(request.url)
  const pathname = url.pathname
  const params = url.searchParams

  if (pathname === '/favicon.ico') {
    return new Response(null)
  }

  const encoding = params.get('encoding') || 'json'

  if (pathname === '/today_in_history') {
    return await fetchTodayInHistory(encoding)
  }

  if (pathname.startsWith('/item/')) {
    const item = pathname.replace(/^\/item\//, '')

    if (item) {
      const n = params.get('n')
      return await fetchItem(item, n, encoding)
    }
  }

  if (pathname.startsWith('/item_list/')) {
    const item = pathname.replace(/^\/item_list\//, '')

    if (item) {
      return await fetchItemList(item, encoding)
    }
  }

  return await fetchReadmeToHtml(import.meta.url)
})
