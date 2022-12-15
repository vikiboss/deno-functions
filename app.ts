import { serve } from 'https://deno.land/std@0.161.0/http/server.ts'

import { fetchReadmeToHtml } from './utils/fetchReadmeToHtml.ts'

const handleRequest = async (request: Request) => {
  const url = new URL(request.url)

  if (url.pathname === '/favicon.ico') {
    return new Response(null)
  }

  return await fetchReadmeToHtml(import.meta.url)
}

serve(handleRequest)
