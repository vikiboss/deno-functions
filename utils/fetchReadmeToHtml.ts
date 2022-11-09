import { path } from '../deps.ts';
import { dirname } from './dirname.ts';

const MD_TO_HTML_API = Deno.env.get('DEV')
  ? 'http://localhost:3000'
  : 'https://markdown2html.deno.dev';

const README_FILE_NAME = 'README.md';

export const fetchReadmeToHtml = async (metaUrl: string) => {
  const readmePath = path.join(dirname(metaUrl), README_FILE_NAME);

  const markdownContent = await Deno.readTextFile(readmePath);

  const res = await fetch(MD_TO_HTML_API, {
    method: 'POST',
    body: markdownContent,
  });

  return res;
};
