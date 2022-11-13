# 百度百科 API

[![github-label](https://img.shields.io/badge/gitub-000000?style=for-the-badge&logo=github)](https://github.com/vikiboss/deno-functions/tree/main/functions/baidu-baike)

百度百科的 `词条信息`、`词条义项列表`、`历史上的今天` API，数据来自百度百科。

支持模糊搜索匹配，比如：https://baidu-baike.deno.dev/item/xiyouji （西游记）

## 用法

- 词条信息
  - JSON: https://baidu-baike.deno.dev/item/UFO
  - Text: https://baidu-baike.deno.dev/item/UFO?encoding=text
- 词条列表
  - JSON: https://baidu-baike.deno.dev/item_list/UFO
  - Text: https://baidu-baike.deno.dev/item_list/UFO&encoding=text
- 历史上的今天
  - JSON: https://baidu-baike.deno.dev/today_in_history
  - Text: https://baidu-baike.deno.dev/today_in_history?encoding=text

```ts
const api = 'https://baidu-baike.deno.dev'

// 通过 `词条名` 搜索并获取词条信息
const item = 'UFO'
const itemUrl = `${api}/item/${encodeURIComponent(item)}`
const itemRes = await fetch(itemUrl)
const itemData = await itemRes.json()

// 通过 `词条名` 搜索并获取义项列表
const item = 'UFO'
const itemListUrl = `${api}/item_list/${encodeURIComponent(item)}`
const itemListRes = await fetch(itemUrl)
const itemListData = await itemRes.json()

// 通过 `词条名` 和 `义项序号` 搜索并获取词条信息 (默认词条可能不是第一条)
const item = 'UFO'
const n = 2
const itemUrl = `${api}/item/${encodeURIComponent(item)}?n=${n}`
const itemRes = await fetch(itemUrl)
const itemData = await itemRes.json()

// 获取 `历史上的今天` 重大事件列表
const hisUrl = `${api}/today_in_history`
const hisRes = await fetch(hisUrl)
const hisData = await hisRes.json()
```

[⬅ back to list](https://viki.deno.dev/)
