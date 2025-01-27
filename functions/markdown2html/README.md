# Markdown (GFM) to HTML API

[![github-label](https://img.shields.io/badge/gitub-000000?style=for-the-badge&logo=github)](https://github.com/vikiboss/deno-functions/tree/main/functions/markdown2html)

Transform `Markdown` (GFM) into pretty `HTML` string, [click here to preview full features](#markdown-render-preview).

## Usage

Just send a `POST` request to the API with the markdown content in the body.

### Node.js

```ts
const api = 'https://md2html.viki.moe'

// or use the deno deploy domain
// const api = 'https://markdown2html.deno.dev'

const markdownContent = `# Hello world
## H2
### H3`

const res = await fetch(api, {
  method: 'POST',
  body: markdownContent,
})

const htmlString = res.text()

console.log(htmlString)
```

### Python

```python
import requests

api = 'https://md2html.viki.moe'

# or use the deno deploy domain
# api = 'https://markdown2html.deno.dev'

markdown_content = '''# Hello world
## H2
### H3'''

res = requests.post(api, data=markdown_content)

html_string = res.text

print(html_string)
```

## Languages supporting syntax highlighting

`bash`, `c`, `cpp`, `csharp`, `css`, `dart`, `diff`, `docker`, `git`, `go`, `http`, `ignore`, `ini`, `java`, `javascript`, `json`, `jsx`, `kotlin`, `less`, `nginx`, `python`, `rust`, `sass`, `scss`, `sql`, `toml`, `tsx`, `typescript`, `yaml`, `zig`

[⬅ back to API list](https://viki.deno.dev/)

---

# Markdown Render Preview 

# Heading 1

Main content. **Bold** *Italic* [Link](https://example.com) `Code`

![Image](https://blog.viki.moe/favicon.ico)

## Heading 2

### Heading 3 with Custom Anchor Id {#custom-id}

#### Heading 4

##### Heading 5

###### Heading 6

## Task List

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

## Table

### Normal Table

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

### Align Table

| Header 1 | Header 2 | Header 3 |
| :------: | :------: | :------: |
|  Center  |  Center  |  Center  |
|  Cell 1  |  Cell 2  |  Cell 3  |

## Autolink

Plain URL text: `https://example.com` => https://example.com

## Math

Block math:

$$ y = x^2 $$

Inline math: $y = x^2$


## GitHub Styled Alert

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

## Code Block

```tsx
import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

```rust
fn main() {
    println!("Hello, world!");
}
```

```python
def hello():
    print('Hello World')
```

```javascript
console.log('Hello World');
```

```json
{
  "name": "Vikash",
  "age": 25
}
```

```diff
+const a = 1;
-const b = 2;
```

## Limited HTML Tags Support

<details>
  <summary>Click to expand!</summary>
  Content inside details
</details>

<img src="https://avatar.viki.moe" alt="Avatar" width="100" height="100" style="border-radius: 12%;">

<div style="display: flex; gap: 8px;">
  <span style="color: tomato;">Tomato Text</span>
  <span style="color: lime;">Lime Text</span>
  <span style="color: skyblue;">Skyblue Text</span>
</div>

## Footnote

This is a footnote[^1].

[^1]: Footnote Content
