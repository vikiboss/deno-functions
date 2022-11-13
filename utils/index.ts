import { fetchReadmeToHtml } from './fetchReadmeToHtml.ts'
import { responseWithJson } from './responseWithJson.ts'

const PORT = Number(Deno.env.get('PORT')) || 8000
const dirname = (metaUrl: string) => new URL('.', metaUrl).pathname

export { dirname, fetchReadmeToHtml, responseWithJson, PORT }
