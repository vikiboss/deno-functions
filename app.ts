import { serve } from './deps.ts';
import { fetchReadmeToHtml } from './utils/fetchReadmeToHtml.ts';

serve(() => fetchReadmeToHtml(import.meta.url));
