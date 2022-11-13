// deno-lint-ignore no-explicit-any
export const responseWithJson = (obj: Record<number | string | symbol, any> | undefined) => {
  let str = ''

  try {
    str = JSON.stringify(obj || {})
  } catch {
    str = JSON.stringify({ status: 500, message: 'Oops', data: null })
  }

  return new Response(str, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
