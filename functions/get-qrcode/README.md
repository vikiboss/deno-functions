# Get QR Code API

Get QR code image by passing a `text` parameter and optional `size`.

# Usage

```ts
const api = 'https://get-qrcode.deno.dev';

const text = 'Hello World';
const size = 256;

const res = await fetch(`${api}?text=${text}&size=${size}`, {});
```

[⬅ back to list](https://viki.deno.dev/)
