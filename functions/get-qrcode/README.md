# Get QR Code API

[![github-label](https://img.shields.io/badge/gitub-000000?style=for-the-badge&logo=github)](https://github.com/vikiboss/deno-functions/tree/main/functions/get-qrcode)

Get QR code image by passing a `text` parameter and optional `size`.

## Usage

```ts
const api = 'https://get-qrcode.deno.dev'

const text = 'Hello World'
const size = 256

const res = await fetch(`${api}?text=${text}&size=${size}`, {})
```

[⬅ back to list](https://viki.deno.dev/)
