import { serve } from 'https://deno.land/std@0.161.0/http/server.ts'

import { fetchItem } from './services/fetchItem.ts'
import { fetchItemList } from './services/fetchItemList.ts'
import { fetchReadmeToHtml, PORT } from '../../utils/index.ts'
import { fetchTodayInHistory } from './services/fetchTodayInHistory.ts'

async function handleRequest(request: Request) {
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
}

serve(handleRequest, { port: PORT })
