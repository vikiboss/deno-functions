import { qrcode } from 'https://deno.land/x/qrcode@v2.0.0/mod.ts'
import * as base64 from 'https://deno.land/x/base64@v0.2.1/mod.ts'

import { fetchReadmeToHtml, PORT } from '../../utils/index.ts'

const SLICE_START = 22
const DEFAULT_SIZE = 256

async function handleRequest(request: Request) {
  const url = new URL(request.url)
  const params = url.searchParams

  if (url.pathname === '/favicon.ico') {
    return new Response(null)
  }

  const text = decodeURIComponent(params.get('text') || '')

  if (!text) {
    return await fetchReadmeToHtml(import.meta.url)
  }

  const option = {
    size: Number(params.get('size')) || DEFAULT_SIZE,
  }

  const isBase64 = params.has('base64')
  const image = String(await qrcode(text, option))

  return new Response(isBase64 ? image : base64.toUint8Array(image.slice(SLICE_START)))
}

Deno.serve(handleRequest, { port: PORT })
