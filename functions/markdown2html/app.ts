import * as path from 'node:path'

import { dirname, PORT } from '../../utils/index.ts'
import { md2html } from './md2html.ts'

const README_PATH = path.join(dirname(import.meta.url), 'README.md')

const RES_OPTIONS = {
  headers: {
    'Content-Type': 'text/html',
  },
}

Deno.serve({ port: PORT, hostname: 'localhost' }, async (request: Request) => {
  const url = new URL(request.url)

  if (url.pathname === '/favicon.ico') {
    return new Response(null)
  }

  let md = ''
  let title = ''

  if (!request.body) {
    md = await Deno.readTextFile(README_PATH)
  } else {
    md = await request.text()
    title = new URL(request.url).searchParams.get('title') || ''
  }

  return new Response(md2html(md, title), RES_OPTIONS)
})
