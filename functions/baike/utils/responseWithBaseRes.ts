export const responseWithBaseRes = (
  obj: Record<number | string | symbol, any> | string | number | boolean | null | undefined,
  status = 200,
  message = 'OK'
) => {
  let res = ''

  try {
    res = JSON.stringify({ status, message, data: obj ?? {} })
  } catch {
    res = JSON.stringify({ status, message: 'Oops', data: {} })
  }

  return new Response(res, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  })
}

export function transferText(str: string, mode: 'u2a' | 'a2u') {
  if (mode === 'a2u') {
    return str.replace(/&#(\d+);/g, (_, $1) => String.fromCharCode(Number($1)))
  } else {
    return str.replace(/./, (_) => `&#${_.charCodeAt(0)};`)
  }
}
