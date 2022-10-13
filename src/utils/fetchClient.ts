const BASE_URL = 'https://632779ed5731f3db995a033d.mockapi.io'

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

async function request<T> (
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const options: RequestInit = { method }

  if (data) {
    options.body = JSON.stringify(data)
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }

  return await fetch(BASE_URL + url, options)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error()
      }

      return await response.json()
    })
}

export const client = {
  get: async <T> (url: string) => await request<T>(url),
  post: async <T>(url: string, data: any) => await request<T>(url, 'POST', data),
  patch: async <T>(url: string, data: any) => await request<T>(url, 'PATCH', data),
  delete: async (url: string) => await request(url, 'DELETE')
}
