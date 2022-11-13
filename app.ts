import { serve } from './deps.ts'
import { fetchReadmeToHtml } from './utils/fetchReadmeToHtml.ts'

const handleRequest = async (request: Request) => {
  const url = new URL(request.url)

  if (url.pathname === '/favicon.ico') {
    return new Response(null)
  }

  return await fetchReadmeToHtml(import.meta.url)
}

serve(handleRequest)
