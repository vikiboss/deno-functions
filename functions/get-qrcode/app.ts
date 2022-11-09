import { serve } from '../../deps.ts';
import { base64, qrcode } from './deps.ts';
import { fetchReadmeToHtml, PORT } from '../../utils/index.ts';

const SLICE_START = 22;
const DEFAULT_SIZE = 256;

async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;

  if (!params.get('text')) {
    return await fetchReadmeToHtml(import.meta.url);
  }

  const text = params.get('text') || '';

  const option = {
    size: Number(params.get('size')) || DEFAULT_SIZE,
  };

  const image = String(await qrcode(text, option));

  return new Response(base64.toUint8Array(image.slice(SLICE_START)));
}

serve(handleRequest, { port: PORT });
