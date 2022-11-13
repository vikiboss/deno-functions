import { serve } from '../../deps.ts'
import { fetchReadmeToHtml, PORT } from '../../utils/index.ts'

async function handleRequest(request: Request) {
  const url = new URL(request.url)

  if (url.pathname === '/usage') {
    return await fetchReadmeToHtml(import.meta.url)
  }

  url.hostname = 'www.google.com'
  url.port = '443'
  url.protocol = 'https:'

  const res = await fetch(url.href, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  })

  return res
}

serve(handleRequest, { port: PORT })
