# Baidu Bake API

Baidu Baike related API.

## Usage

```ts
const api = 'https://baidu-baike.deno.dev'

// fetch item short description via name
const item = '李白'
const itemUrl = `${api}/item/${encodeURIComponent(item)}`
const itemRes = await fetch(itemUrl)
const itemData = await itemRes.json()

// fetch event list happening today in history
// or just open https://baidu-baike.deno.dev/today_in_history
const hisUrl = `${api}/today_in_history`
const hisRes = await fetch(hisUrl)
const hisData = await hisRes.json()
```

[⬅ back to list](https://viki.deno.dev/)