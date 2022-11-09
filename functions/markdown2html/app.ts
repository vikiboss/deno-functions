import { path, serve } from '../../deps.ts';
import { dirname } from '../../utils/index.ts';
import { md2html } from './md2html.ts';

const README_PATH = path.join(dirname(import.meta.url), 'README.md');

const RES_OPTIONS = {
  headers: {
    'Content-Type': 'text/html',
  },
};

async function handleRequest(request: Request) {
  let md = '';
  let title = '';

  if (!request.body) {
    md = await Deno.readTextFile(README_PATH);
  } else {
    md = await request.text();
    title = new URL(request.url).searchParams.get('title') || '';
  }

  return new Response(md2html(md, title), RES_OPTIONS);
}

const PORT = Number(Deno.env.get('PORT')) || 8000;

serve(handleRequest, { port: PORT });
