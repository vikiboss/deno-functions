import * as path from 'https://deno.land/std@0.149.0/path/mod.ts'

const MD_TO_HTML_API = Deno.env.get('DEV')
  ? 'http://localhost:3000'
  : 'https://markdown2html.deno.dev'

const README_FILE_NAME = 'README.md'

export const fetchReadmeToHtml = async (metaUrl: string) => {
  const { pathname } = new URL('.', metaUrl)
  const readmePath = path.join(pathname, README_FILE_NAME)

  const markdownContent = await Deno.readTextFile(readmePath)

  const res = await fetch(MD_TO_HTML_API, {
    method: 'POST',
    body: markdownContent,
  })

  return res
}
