# Markdown to HTML API

[![GitHub-label](https://img.shields.io/badge/gitub-000000?style=for-the-badge&logo=github)](https://github.com/vikiboss/deno-functions/tree/main/functions/markdown2html)

## Usage

```ts
const api = 'https://markdown2html.deno.dev';

const markdownContent = `# Hello world
## H2
### H3`;

const res = await fetch(api, {
  method: 'POST',
  body: markdownContent,
});

const htmlString = res.text();

console.log(htmlString);
```

## Languages supporting syntax highlighting

- `bash`
- `c`
- `cpp`
- `csharp`
- `css`
- `dart`
- `diff`
- `docker`
- `git`
- `go`
- `http`
- `ignore`
- `ini`
- `java`
- `json`
- `jsx`
- `kotlin`
- `less`
- `nginx`
- `python`
- `rust`
- `sass`
- `scss`
- `sql`
- `toml`
- `tsx`
- `typescript`
- `yaml`