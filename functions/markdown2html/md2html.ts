import { CSS, render } from 'jsr:@deno/gfm@0.10.0'

import 'https://esm.sh/prismjs@1.29.0/components/prism-bash?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-c?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-cpp?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-csharp?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-css?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-dart?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-diff?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-docker?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-git?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-go?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-http?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-ignore?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-ini?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-java?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-javascript?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-json?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-jsx?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-kotlin?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-less?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-nginx?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-python?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-rust?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-sass?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-scss?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-sql?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-toml?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-tsx?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-yaml?no-check'
import 'https://esm.sh/prismjs@1.29.0/components/prism-zig?no-check'

const dirname = new URL(import.meta.url).pathname.split('/').slice(0, -1).join('/')
const gfmCSS = Deno.readTextFileSync(`${dirname}/css/gfm.css`)

export const md2html = (md: string, pageTitle = '') => {
  const title = md.match(/^#+ (.+)\n?/g)?.[0].slice(2) || pageTitle
  const body = render(md, { allowMath: true })

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body {
        background-color: var(--color-canvas-default);
      }
      main {
        max-width: 800px;
        margin: 0 auto;
      }

      ${CSS}

      ${gfmCSS}
    </style>
  </head>
  <body data-color-mode="auto" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
    <main>
    ${body}
    </main>
  </body>
</html>
`
  return html
}
