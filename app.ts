import { fetchReadmeToHtml } from './utils/fetchReadmeToHtml.ts'

Deno.serve(async (request: Request) => {
  const url = new URL(request.url)

  if (url.pathname === '/favicon.ico') {
    return fetch('https://avatar.viki.moe')
  }

  return await fetchReadmeToHtml(import.meta.url)
})
