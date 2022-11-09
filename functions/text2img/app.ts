import { serve } from '../../deps.ts';
import { fetchReadmeToHtml, PORT } from '../../utils/index.ts';

async function handleRequest(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    return await fetchReadmeToHtml(import.meta.url);
  }

  return new Response('[WIP] API for transforming text to image');
}

serve(handleRequest, { port: PORT });
