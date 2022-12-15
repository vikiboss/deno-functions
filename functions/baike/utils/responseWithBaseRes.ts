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
      'Content-Type': 'application/json',
    },
  })
}
