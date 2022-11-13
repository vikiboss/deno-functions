# Viki's Deno Functions

[![github-label](https://img.shields.io/badge/gitub-source%20code-000000?style=for-the-badge&logo=github)](https://github.com/vikiboss/deno-functions)

A set of useful serverless **functions** and **proxies** powered by [Deno](https://deno.land/) and deployed by [Deno Deploy](https://deno.dev/). They're fast!

## Functions / API 函数

- [**百度百科 API / Baidu Wiki API**](https://github.com/vikiboss/deno-functions/tree/main/functions/baidu-baike): https://baidu-baike.deno.dev

  百度百科 API，获取词条信息、词条义项列表、历史上的今天。

- [**MD 转 HTML API / MD to HTML API**](https://github.com/vikiboss/deno-functions/tree/main/functions/markdown2html): https://markdown2html.deno.dev

  Transform `Markdown` into `HTML` string, support many languages' sytax highlighting in code block.

- [**生成二维码 API / Generate QR Code API**](https://github.com/vikiboss/deno-functions/tree/main/functions/get-qrcode): http://get-qrcode.deno.dev

  Get QR code image by passing a `text` parameter and optional `size`.

<!-- - [[WIP] **Text to Image**](https://github.com/vikiboss/deno-functions/tree/main/functions/text2img): https://text2img.deno.dev

  Transform `text` into an `image`. -->

## Proxies / 代理

- [**GitHub Proxy**](https://github.com/vikiboss/deno-functions/tree/main/functions/gh-proxy): https://gh-proxy.deno.dev/usage

  Proxy for `github.com` to improve your GitHub browsing experience.

- [**GitHub API Proxy**](https://github.com/vikiboss/deno-functions/tree/main/functions/gh-api-proxy): https://gh-api-proxy.deno.dev/usage

  Proxy for `api.github.com`.

- [**raw.githubusercontent.com Proxy**](https://github.com/vikiboss/deno-functions/tree/main/functions/gh-raw-proxy): https://gh-raw-proxy.deno.dev/usage

  Proxy for `raw.githubusercontent.com` to speed up your downloads on GitHub.

- [**Google Search Proxy**](https://github.com/vikiboss/deno-functions/tree/main/functions/google-proxy): https://google-proxy.deno.dev/usage

  Proxy for `www.google.com` (Google Search). Just for temporary usage, don't relay on it.

## Thanks

[KusStar/deno-serverless-functions](https://github.com/KusStar/deno-serverless-functions)

## License

[MIT](https://github.com/vikiboss/deno-functions/tree/main/LICENSE) License © 2022-PRESENT Viki
